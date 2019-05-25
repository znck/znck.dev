workflow "Deploy to Netlify" {
  on = "push"
  resolves = ["Push to Netlify"]
}

action "pnpm install" {
  uses = "znck/pnpm@master"
  args = "install --frozen-lockfile"
}

action "pnpm run build" {
  uses = "znck/pnpm@master"
  needs = ["pnpm install"]
  args = "run build"
}

action "Push to Netlify" {
  uses = "netlify/actions/build@master"
  needs = ["pnpm run build"]
  secrets = ["GITHUB_TOKEN", "NETLIFY_SITE_ID"]
  env = {
    NETLIFY_DIR = "dist"
  }
}
