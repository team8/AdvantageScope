export class testTab{
    #content = null;
    #table = null;
    #tableContainer = null;
    #filterForm = null;
    #logPath = null;
    #logFile = new XMLHttpRequest();
    #logRaw = "";
    #date = new Date();
    #cur_lookfor = null;

    timestamps = [];
    data = [];
    
    constructor(content) {
        this.#content = content;
        console.log(content.children);
        this.#tableContainer = content.getElementsByClassName("test-table-container")[0];
        this.#table = this.#tableContainer.getElementsByClassName("test-table")[0];
        this.#filterForm = this.#content.getElementsByClassName("filters-container")[0];
        this.#logPath = "text.txt";
        console.log(this.#filterForm.children);
        console.log((this.#table.nodeName));

        this.resetTable();

        /*
        for (var i = 0; i < 10; i++){
            this.timestamps.push(i);
            this.data.push((i/2).toString());
        }*/

        this.displayTable({lookfor: null});

        this.#filterForm.addEventListener("submit", (event) => {
            var input = this.#filterForm["lookfor"].value;
            console.log(input);
            this.resetTable();
            if (input.length == 0) {
                this.displayTable({ lookfor: null });
            } else {
                this.displayTable({ lookfor: input });
            }
            //await new Promise(r => setTimeout(r, 2000));
            event.preventDefault();
        });
    }

    resetTable() {
        this.#table.innerHTML = "";
        var row = this.#table.insertRow(0);
        var timestamp = row.insertCell(0);
        timestamp.innerHTML = "timestamp";
        timestamp.style.width = "25%";
        row.insertCell(1).innerHTML = "data";
    }

    addRow(timestamp, data) {
        var row = this.#table.insertRow(-1);
        row.insertCell(0).innerHTML = timestamp;
        row.insertCell(1).innerHTML = data;
    }

    displayTable(filters) {
        this.resetTable();
        console.log(filters);
        for (var i = 0; i < this.timestamps.length; i++){
            //console.log(i);
            if (filters.lookfor == null || filters.lookfor == this.data[i]) {
                //console.log("add");
                this.addRow(this.timestamps[i], this.data[i]);  
            }
        }
    }

    async periodic() {
        /*
        console.log("rehehehe");
        var logfile = new XMLHttpRequest();
        await logfile.open("GET", "text.txt", false);
        console.log(logfile.readyState);
        //logfile.onreadystatechange = function () {
            console.log("nyehhhhh");
            //if (logfile.readyState == 4) {
                //if (logfile.status == 200 || rawFile.status == 0) {
                    var tmpRawText = logfile.responseText;
                    if (tmpRawText.length > this.#logRaw) {
                        var oldLength = this.#logRaw.length;
                        this.#logRaw = tmpRawText;
                        var addLogs = this.#logRaw.slice(oldLength, -1);
                        addLogs = addLogs.split("\n");
                        for (var i = 0; i < addLogs.length; i++){
                            this.timestamps.push(this.#date.getMilliseconds());
                            this.data.push(addLogs[i]);
                        }
                        
                    }
             //   }
            //}
        //}
        */
        var res = await fetch("./modules/tabControllers/text.txt", {});
        //console.log(await res.text());
        var arr = (await res.text()).split("\n");
        if (arr.length > this.data.length) {
            for (var i = this.data.length; i < arr.length; i++) {
                this.timestamps.push(1);
                this.data.push(arr[i]);
            }
            this.displayTable({ lookfor: null });
        }
    }
}