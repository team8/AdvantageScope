// Test tab used for filtering logs
export class MihirTestTab {
    #doc = null;
    #tableContainer = null;
    #dataTable = null;
    constructor(doc) {
        this.#doc = doc;
        this.#tableContainer = doc.getElementsByClassName("mihir-table-container");
        this.#dataTable = doc.getElemementsByClassName("mihir-table");
        this.#dataTable[1][0].innerHTML = 0;
        this.#dataTable[1][1].innerHTML = 4;
        this.#dataTable[2][0].innerHTML = 1;
        this.#dataTable[2][1].innerHTML = 10;
    }
}