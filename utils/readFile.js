const { error } = require('console')
const fs = require('fs')
/**
 * Read file to gets data
 * @param {string} path path location file
 */
function readFileMovie( path ) {

    const data = fs.readFileSync(path, (error) => {
        console.log("Error when reading file: ", path)
        return null
    })
    return data
    // console.log("Data from file", data)
}

module.exports = readFileMovie