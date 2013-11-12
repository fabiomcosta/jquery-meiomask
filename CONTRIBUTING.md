## Contributing
Some details on how to contribute and stuff for maintainers of the project.

### Release process

Very simple:

* After doing your changes on the `src/meiomask.js` files run `grunt`
* in the dist path files `meiomask.js` and `meiomask.min.js` are going to be update.
* Update the `CHANGELOG.md` file with the new version number and it's list of changes. A list of changes
* Update `meiomask.jquery.json` and `package.json` with the new version number
* can be easily generated from the url https://github.com/fabiomcosta/jquery-meiomask/compare/<previous-version>...master
* create a git tag: `git tag <version>`
* push the new version with the new created tag: `git push --tags`
