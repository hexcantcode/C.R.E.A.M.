use anchor_lang::prelude::*;
use sha2::{Sha256, Digest};

/// Twitter verification helper
pub struct TwitterVerification;

impl TwitterVerification {
    /// Verify Twitter handle and proof
    /// In production, this would verify against Twitter's OAuth
    pub fn verify_twitter_auth(
        twitter_handle: &str,
        twitter_proof: &str,
        trader_pubkey: &Pubkey,
    ) -> anchor_lang::Result<bool> {
        use crate::VaultError;
        
        // Create expected message
        let message = format!("{}:{}", twitter_handle, trader_pubkey.to_string());
        
        // Hash the message
        let mut hasher = Sha256::new();
        hasher.update(message.as_bytes());
        let hash = hasher.finalize();

        // In production, the proof would be a signature from Twitter OAuth
        // For now, we do basic validation
        let proof_hash = hex::decode(twitter_proof).map_err(|_| error!(VaultError::InvalidTwitterProof))?;
        
        if proof_hash.len() != 32 {
            return Err(VaultError::InvalidTwitterProof.into());
        }

        // Compare hashes
        let matches = hash.as_slice() == proof_hash.as_slice();
        
        if !matches {
            msg!("Twitter verification failed for handle: {}", twitter_handle);
        }

        Ok(matches)
    }

    /// Verify Twitter handle format
    pub fn is_valid_handle(handle: &str) -> bool {
        // Basic validation: alphanumeric + underscore, 1-15 chars
        if handle.len() < 1 || handle.len() > 15 {
            return false;
        }
        
        handle.chars().all(|c| c.is_alphanumeric() || c == '_')
    }
}

