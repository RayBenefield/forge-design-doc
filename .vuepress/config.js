const dirTree = require('directory-tree')
const path = require('path')
const merge = require('lodash.mergewith')
const titleCase = require('lodash.startcase')
const isArray = require('lodash.isarray')

const root = path.join(__dirname, '../')
var projects = []
dirTree(
    root,
    { extensions: /\.md/, exclude: /\/node_modules\// },
    (item, PATH) => projects.push(item)
)
const concatArrays = (objValue, srcValue) => {
    if (isArray(objValue)) {
        return objValue.concat(srcValue)
    }
}
projects = projects.reduce((sidebar, project) => {
    const filePath = path.relative(root, project.path)
    const file = path.parse(filePath)
    return merge(
        sidebar,
        { [file.dir]: [`${file.dir}/${file.name}`] },
        concatArrays
    )
}, {})

const sidebar = Object.entries(projects).map(
    ([group, children]) =>
        !group
            ? ['/', 'Home']
            : {
                  title: titleCase(group),
                  collapsable: false,
                  children: children,
              }
)

module.exports = {
    title: 'Forge Design Document',
    description: "Design Document for Halo's Forge Engine",
    themeConfig: {
        displayAllHeaders: true,
        sidebar,
    },
}
