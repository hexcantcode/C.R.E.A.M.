import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { HedgeVault } from "../target/types/hedge_vault";
import { PublicKey, Keypair, SystemProgram } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, MINT_SIZE, getMinimumBalanceForRentExemptMint } from "@solana/spl-token";

describe("hedge_vault", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.HedgeVault as Program<HedgeVault>;
  
  const trader = provider.wallet;
  const investor = Keypair.generate();
  const investor2 = Keypair.generate();

  let vault: PublicKey;
  let tokenMint: PublicKey;
  let traderVaultTokenAccount: PublicKey;
  let investorVaultTokenAccount: PublicKey;
  let vaultTokenAccount: PublicKey;

  before(async () => {
    // Airdrop SOL to test accounts
    await provider.connection.requestAirdrop(
      investor.publicKey,
      2 * anchor.web3.LAMPORTS_PER_SOL
    );
    await provider.connection.requestAirdrop(
      investor2.publicKey,
      2 * anchor.web3.LAMPORTS_PER_SOL
    );

    // Wait for confirmation
    await new Promise(resolve => setTimeout(resolve, 1000));
  });

  it("Initializes and creates a vault", async () => {
    // Derive vault PDA
    const [vaultPda] = await PublicKey.findProgramAddress(
      [Buffer.from("vault"), trader.publicKey.toBuffer()],
      program.programId
    );
    vault = vaultPda;

    // Create a test token mint
    const mintKeypair = Keypair.generate();
    tokenMint = mintKeypair.publicKey;

    const lamports = await getMinimumBalanceForRentExemptMint(
      provider.connection
    );

    const tx = new anchor.web3.Transaction().add(
      anchor.web3.SystemProgram.createAccount({
        fromPubkey: trader.publicKey,
        newAccountPubkey: mintKeypair.publicKey,
        lamports,
        space: MINT_SIZE,
        programId: TOKEN_PROGRAM_ID,
      })
    );

    await provider.sendAndConfirm(tx, [trader, mintKeypair]);

    // Generate Twitter proof hash
    const twitterHandle = "test_trader";
    const message = `${twitterHandle}:${trader.publicKey.toString()}`;
    const hash = anchor.utils.sha256.hash(message);
    const twitterProof = hash;

    // Create vault
    const txSig = await program.methods
      .createVault(
        "Test Vault",
        twitterHandle,
        twitterProof,
        new anchor.BN(2000) // 20% performance fee
      )
      .accounts({
        vault: vault,
        trader: trader.publicKey,
        twitterOracle: trader.publicKey, // Placeholder
        tokenMint: tokenMint,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    console.log("Vault created:", txSig);

    const vaultAccount = await program.account.vault.fetch(vault);
    console.log("Vault details:", {
      name: vaultAccount.vaultName,
      twitter: vaultAccount.twitterHandle,
      trader: vaultAccount.trader.toString(),
      fee: vaultAccount.performanceFeeBps.toNumber(),
    });
  });

  it("Investor deposits funds", async () => {
    // Create investor token account
    // Create vault token account
    // Perform deposit

    const amount = new anchor.BN(1000);

    const txSig = await program.methods
      .deposit(amount)
      .accounts({
        vault: vault,
        investorInfo: (
          await PublicKey.findProgramAddress(
            [Buffer.from("investor"), vault.toBuffer(), investor.publicKey.toBuffer()],
            program.programId
          )
        )[0],
        investor: investor.publicKey,
        investorVault: investorVaultTokenAccount,
        vaultTokenAccount: vaultTokenAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .signers([investor])
      .rpc();

    console.log("Deposit transaction:", txSig);
  });

  // More tests for withdraw, advance epoch, etc.
});


