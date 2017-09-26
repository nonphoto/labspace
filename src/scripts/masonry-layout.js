const getLowestIndex = (array) => {
    return array.reduce((lowest, next, index) => {
        if (next < array[lowest]) {
            return index
        }
        else {
            return lowest
        }
    }, 0)
}

export default class MasonryLayout {
    constructor(container) {
        this.container = container
        this.children = Array.from(container.children)
    }

    pack() {
        const computedStyles = window.getComputedStyle(this.container)
        const columnCount = computedStyles.columnCount

        const columnHeights = []
        const columns = []
        for (let i = 0; i < columnCount; i++) {
            columnHeights[i] = 0
            columns.push([])
        }


        this.children.forEach((child) => {
            const height = child.clientHeight
            const lowestIndex = getLowestIndex(columnHeights)

            columnHeights[lowestIndex] += height
            columns[lowestIndex].push(child)
        })

        const orderedChildren = []
        orderedChildren.concat(...columns).forEach((child) => {
            this.container.appendChild(child)
        })
    }
}