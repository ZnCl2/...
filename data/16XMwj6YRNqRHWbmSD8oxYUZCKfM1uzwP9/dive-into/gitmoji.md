# Selected Gitmojis

## tl;tr

emoji | code | usage | Angular Convention
- | - | - | -
π¨ | `:art:` | refactor | refactor
π | `:bug:` | bug fix | fix
π₯ | `:fire:` | remove feature | n/a
π | `:memo:` | doc | docs
π | `:new:` | new feature | feat
π | `:lock:` | security fix | n/a
β‘οΈ | `:zap:` | performance | perf


## Intersection between gitmoji and Atom style guide

* π¨ `:art:` when improving the format/structure of the code
* π `:memo:` when writing docs
* π§ `:penguin:` when fixing something on Linux
* π `:apple:` when fixing something on macOS
* π `:checkered_flag:` when fixing something on Windows
* π `:bug:` when fixing a bug
* π₯ `:fire:` when removing code or files
* π `:green_heart:` when fixing the CI build
* β `:white_check_mark:` when adding tests
* π `:lock:` when dealing with security
* β¬οΈ `:arrow_up:` when upgrading dependencies
* β¬οΈ `:arrow_down:` when downgrading dependencies

## Conflicts between gitmoji and Atom style guide

| Meaning | gitmoji | Atom |
| - | - | - |
| Performance | β‘οΈ | π |
| Removing linter warnings | π¨ | π |

## Comparison with Angular Convention

| [Angular] | gitmoji |
| - | - |
| feat | β¨ |
| fix | π |
| docs | π |
| style | π¨ |
| refactor | β»οΈ |
| perf | β‘οΈ |
| test | β |
| chore | π (deploy)γor π (CI) |

[Angular]: https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#type

## A reduced list of gitmoji

From the intersection, remove the following emojis:

- Too long:

    :penguin:, :checkered_flag:, :green_heart:, :white_check_mark:, :arrow_up:, :arrow_down:

- Ambiguous:

    * :green_heart:, I don't know why this is related to CI.
    * :arrow_up:, this could mean "bump version".
    * :arrow_down:, this could mean "regression".

- Other:

    :apple:, since both :penguin: and :checkered_flag: have been removed.

And add the following:

- β‘οΈ `:zap:` for performance from gitmoji.
- π `:new:` for new features (I saw someone used this).

Thus the final list is:

* π¨ `:art:` when improving the format/structure of the code
* π `:bug:` when fixing a bug
* π₯ `:fire:` when removing code or files
* π `:memo:` when writing docs
* π `:new:` when adding a new feature
* π `:lock:` when fixing security problems
* β‘οΈ `:zap:` when improving performance

Compared to Angular Convention, I removed the following types:

- `test` and `chore`: tests and build process are part of code logic.
- `style`: White-space, formatting etc. are unimportant. And most of the time, they do not deserve a separate commit.

I added the following types:

- A security issue (`:lock:`) is a special kind of bug (`:bug:`). It is so important that I use a different emoji.
- Removing a feature (`:fire:`) belongs to `refactor` by Angular Convention's definition: "A code change that neither fixes a bug nor adds a feature". However, it makes sense to assume a refactor dose not introduce a breaking change of API, while removing a feature always break the API.