use anyhow::{Error, Result};
use poise::serenity_prelude as serenity;
use tracing::Level;
use tracing_subscriber::FmtSubscriber;

struct Data {}
type Context<'a> = poise::Context<'a, Data, Error>;

#[poise::command(slash_command)]
async fn age(
  ctx: Context<'_>,
  #[description = "Selected user"] user: Option<serenity::User>,
) -> Result<(), Error> {
  let u = user.as_ref().unwrap_or_else(|| ctx.author());
  let response = format!("**{}'s account was created at {}**", u.name, u.created_at());
  ctx.say(response).await?;
  Ok(())
}

#[tokio::main]
async fn main() -> Result<(), Error> {
  let env = std::env::var("ENV").unwrap_or("dev".into());
  FmtSubscriber::builder()
    .with_max_level(if env == "prod" {
      Level::INFO
    } else {
      Level::DEBUG
    })
    .init();

  let Ok(token) = std::env::var("TOKEN") else {
    tracing::error!("TOKEN is missing. Did you forget to put one?");
    std::process::exit(1);
  };
  let intents = serenity::GatewayIntents::non_privileged();

  let framework = poise::Framework::builder()
    .options(poise::FrameworkOptions {
      commands: vec![age()],
      ..Default::default()
    })
    .setup(|ctx, _ready, framework| {
      Box::pin(async move {
        poise::builtins::register_globally(ctx, &framework.options().commands).await?;
        Ok(Data {})
      })
    })
    .build();

  let client = serenity::ClientBuilder::new(token, intents)
    .framework(framework)
    .await;
  client?.start().await?;

  Ok(())
}
