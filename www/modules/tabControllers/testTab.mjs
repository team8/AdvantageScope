export class testTab{
    #content = null;
    #table = null;
    #tableContainer = null;
    constructor(content) {
        this.#content = content;
        console.log(content.children);
        this.#tableContainer = content.getElementsByClassName("test-table-container")[0];
        this.#table = this.#tableContainer.getElementsByClassName("test-table")[0];
        console.log((this.#table.nodeName));

        var header = this.#table.insertRow(0);
        header.insertCell(0).innerHTML = "numbers";
        header.insertCell(1).innerHTML = "also numbers";
        for (var i = 0; i < 10; i++){
            var row = this.#table.insertRow(-1);
            var cell = row.insertCell(0);
            var cell1 = row.insertCell(1);
            cell.innerHTML = i;
            cell1.innerHTML = i / 2;
        }
    }
}