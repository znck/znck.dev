workflow "Deploy" {
  on = "push"
  resolves = ["maxheld83/ghpages"]
}

action "Is master branch?" {
  uses = "actions/bin/filter@3c0b4f0e63ea54ea5df2914b4fabf383368cd0da"
  args = "branch master"
}

action "Install dependencies" {
  uses = "znck/pnpm@master"
  needs = ["Is master branch?"]
  args = "install --frozen-lockfile"
}

action "Build" {
  uses = "znck/pnpm@master"
  needs = ["Install dependencies"]
  args = "build"
}

action "maxheld83/ghpages" {
  uses = "maxheld83/ghpages@v0.2.1"
  needs = ["Build"]
  env = {
    BUILD_DIR = "dist"
  }
  secrets = ["GH_PAT"]
}
