workflow "Deploy to Netlify" {
  on = "push"
  resolves = ["Push to Netlify"]
}

action "ppm install" {
  uses = "znck/pnpm@master"
  args = "install --frozen-lockfile"
}

action "@znck/pnpm@master" {
  uses = "znck/pnpm@master"
  needs = ["ppm install"]
  args = "run build"
}

action "Push to Netlify" {
  uses = "netlify/actions/build@master"
  needs = ["@znck/pnpm@master"]
  secrets = ["GITHUB_TOKEN", "NETLIFY_SITE_ID"]
  env = {
    NETLIFY_DIR = "dist"
  }
}
