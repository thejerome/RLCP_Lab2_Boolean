function init_lab() {
    const byDefault = {
        firstTask: "(\xaca \u2227 \xacb \u2227 c) \u2228 (\xaca \u2227 b \u2227 c) \u2228 (a \u2227 \xacb \u2227 \xacc) \u2228 (a \u2227 b \u2227 c)",
        secondTask: "(a \u2228 c) \u2227 (a \u2228 d) \u2227 (b \u2228 c) \u2227 (b \u2228 d) \u2227 (c \u2228 d) \u2227 (c \u2228 e)"
    };

    let answers = {
        firstTaskAnswer: {
            "1": [],
            "2": [],
            "3": [],
            "4": [],
            "5": []
        },
        secondTaskAnswer: ""
    };

    function parseVariant(str, def_obj) {
        let parse_str;
        if (typeof str === 'string' && str !== "") {
            try {
                parse_str = JSON.parse(str);
            }
            catch (e) {
                if (def_obj){
                    parse_str = def_obj;
                }
                else {
                    parse_str = false;
                }
            }
        }
        else {
            if (def_obj){
                parse_str = def_obj;
            }
            else {
                parse_str = false;
            }
        }
        return parse_str;
    }

    return {
        setVariant : function(str){
            let variant;
            if (str !== undefined) {
                variant = parseVariant(str, byDefault);
            }
            else {
                variant = byDefault;
            }
            return variant;
        },
        setPreviousSolution: function(str){
            let previousSolution;
            if (str !== undefined) {
                try {
                    previousSolution = JSON.parse(str);
                }
                catch (e) {}
            }
            return previousSolution;
        },
        setMode: function(str){},

        init: function () {
            let variant = this.setVariant($("#preGeneratedCode").val());
            let previousSolution = this.setPreviousSolution($("#previousSolution").val());
            if (previousSolution !== undefined) {
                answers.firstTaskAnswer = previousSolution.firstTaskAnswer;
                answers.secondTaskAnswer = previousSolution.secondTaskAnswer;
            }
            else {
                answers.firstTaskAnswer = {
                    "1": [],
                    "2": [],
                    "3": [],
                    "4": [],
                    "5": []
                };
                answers.secondTaskAnswer = "";
            }
            let content = '' +
                '<div class = "header">' +
                    '<h1>\u0411\u0443\u043b\u0435\u0432\u0430 \u0430\u043b\u0433\u0435\u0431\u0440\u0430</h1>' +
                    '<input type="button" class="btn btn-info" id = "infoModalOpener" value = "' + '\u0421\u043f\u0440\u0430\u0432\u043a\u0430' + '">' +
                '</div>' +
                '<div class = "lab-initial-first">' +
                    '<h2>\u0418\u0441\u0445\u043e\u0434\u043d\u0430\u044f \u0431\u0443\u043b\u0435\u0432\u0430 \u0444\u0443\u043d\u043a\u0446\u0438\u044f</h2>' +
                    '<p>\u0192(a, b, c) = ' + variant.firstTask + '</p>' +
                '</div>' +

                '<div class = "lab-task-first">' +
                    '<h2>\u0422\u0430\u0431\u043b\u0438\u0446\u0430 \u0438\u0441\u0442\u0438\u043d\u043d\u043e\u0441\u0442\u0438</h2>' +
                    '<table class = "table table-bordered" id = "table">' +
                        '<thead>' +
                            '<td>a</td>' +
                            '<td>b</td>' +
                            '<td>c</td>' +
                            '<td>' + variant.firstTask.split(' \u2228 ')[0].substring(1, variant.firstTask.split(' \u2228 ')[0].indexOf(")")) + '</td>' +
                            '<td>' + variant.firstTask.split(' \u2228 ')[1].substring(1, variant.firstTask.split(' \u2228 ')[1].indexOf(")")) + '</td>' +
                            '<td>' + variant.firstTask.split(' \u2228 ')[2].substring(1, variant.firstTask.split(' \u2228 ')[2].indexOf(")")) + '</td>' +
                            '<td>' + variant.firstTask.split(' \u2228 ')[3].substring(1, variant.firstTask.split(' \u2228 ')[3].indexOf(")")) + '</td>' +
                            '<td>\u0192(a, b, c)</td>' +
                        '</thead>' +
                        '<tr>' +
                            '<td>0</td>' +
                            '<td>0</td>' +
                            '<td>0</td>' +
                            '<td><input type="number" min="0" max="1" value="" tabindex = "1"></td>' +
                            '<td><input type="number" min="0" max="1" value="" tabindex = "2"></td>' +
                            '<td><input type="number" min="0" max="1" value="" tabindex = "3"></td>' +
                            '<td><input type="number" min="0" max="1" value="" tabindex = "4"></td>' +
                            '<td><input type="number" min="0" max="1" value="" tabindex = "5"></td>' +
                        '</tr>' +
                        '<tr>' +
                            '<td>0</td>' +
                            '<td>0</td>' +
                            '<td>1</td>' +
                            '<td><input type="number" min="0" max="1" value="" tabindex = "1"></td>' +
                            '<td><input type="number" min="0" max="1" value="" tabindex = "2"></td>' +
                            '<td><input type="number" min="0" max="1" value="" tabindex = "3"></td>' +
                            '<td><input type="number" min="0" max="1" value="" tabindex = "4"></td>' +
                            '<td><input type="number" min="0" max="1" value="" tabindex = "5"></td>' +
                        '</tr>' +
                        '<tr>' +
                            '<td>0</td>' +
                            '<td>1</td>' +
                            '<td>0</td>' +
                            '<td><input type="number" min="0" max="1" value="" tabindex = "1"></td>' +
                            '<td><input type="number" min="0" max="1" value="" tabindex = "2"></td>' +
                            '<td><input type="number" min="0" max="1" value="" tabindex = "3"></td>' +
                            '<td><input type="number" min="0" max="1" value="" tabindex = "4"></td>' +
                            '<td><input type="number" min="0" max="1" value="" tabindex = "5"></td>' +
                        '</tr>' +
                        '<tr>' +
                            '<td>0</td>' +
                            '<td>1</td>' +
                            '<td>1</td>' +
                            '<td><input type="number" min="0" max="1" value="" tabindex = "1"></td>' +
                            '<td><input type="number" min="0" max="1" value="" tabindex = "2"></td>' +
                            '<td><input type="number" min="0" max="1" value="" tabindex = "3"></td>' +
                            '<td><input type="number" min="0" max="1" value="" tabindex = "4"></td>' +
                            '<td><input type="number" min="0" max="1" value="" tabindex = "5"></td>' +
                        '</tr>' +
                        '<tr>' +
                            '<td>1</td>' +
                            '<td>0</td>' +
                            '<td>0</td>' +
                            '<td><input type="number" min="0" max="1" value="" tabindex = "1"></td>' +
                            '<td><input type="number" min="0" max="1" value="" tabindex = "2"></td>' +
                            '<td><input type="number" min="0" max="1" value="" tabindex = "3"></td>' +
                            '<td><input type="number" min="0" max="1" value="" tabindex = "4"></td>' +
                            '<td><input type="number" min="0" max="1" value="" tabindex = "5"></td>' +
                        '</tr>' +
                        '<tr>' +
                            '<td>1</td>' +
                            '<td>0</td>' +
                            '<td>1</td>' +
                            '<td><input type="number" min="0" max="1" value="" tabindex = "1"></td>' +
                            '<td><input type="number" min="0" max="1" value="" tabindex = "2"></td>' +
                            '<td><input type="number" min="0" max="1" value="" tabindex = "3"></td>' +
                            '<td><input type="number" min="0" max="1" value="" tabindex = "4"></td>' +
                            '<td><input type="number" min="0" max="1" value="" tabindex = "5"></td>' +
                        '</tr>' +
                        '<tr>' +
                            '<td>1</td>' +
                            '<td>1</td>' +
                            '<td>0</td>' +
                            '<td><input type="number" min="0" max="1" value="" tabindex = "1"></td>' +
                            '<td><input type="number" min="0" max="1" value="" tabindex = "2"></td>' +
                            '<td><input type="number" min="0" max="1" value="" tabindex = "3"></td>' +
                            '<td><input type="number" min="0" max="1" value="" tabindex = "4"></td>' +
                            '<td><input type="number" min="0" max="1" value="" tabindex = "5"></td>' +
                        '</tr>' +
                        '<tr>' +
                            '<td>1</td>' +
                            '<td>1</td>' +
                            '<td>1</td>' +
                            '<td><input type="number" min="0" max="1" value="" tabindex = "1"></td>' +
                            '<td><input type="number" min="0" max="1" value="" tabindex = "2"></td>' +
                            '<td><input type="number" min="0" max="1" value="" tabindex = "3"></td>' +
                            '<td><input type="number" min="0" max="1" value="" tabindex = "4"></td>' +
                            '<td><input type="number" min="0" max="1" value="" tabindex = "5"></td>' +
                        '</tr>' +
                    '</table>' +
                '</div>' +

                '<div class = "lab-initial-second">' +
                    '<h2>\u0418\u0441\u0445\u043e\u0434\u043d\u0430\u044f \u0431\u0443\u043b\u0435\u0432\u0430 \u0444\u0443\u043d\u043a\u0446\u0438\u044f \u0432 \u041a\u041d\u0424</h2>' +
                    '<p>\u0192(a, b, c, e, f, g) = ' + variant.secondTask + '</p>' +
                '</div>' +
                '<div class = "lab-task-second">' +
                    '<h2>\u041e\u0442\u0432\u0435\u0442 - \u0431\u0443\u043b\u0435\u0432\u0430 \u0444\u0443\u043d\u043a\u0446\u0438\u044f \u0432 \u0441\u043e\u043a\u0440\u0430\u0449\u0451\u043d\u043d\u043e\u0439 \u0414\u041d\u0424</h2>' +
                    '<span class = "alert alert-info notation">\u0414\u043b\u044f \u0432\u0432\u043e\u0434\u0430 \u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0438\u0440\u0443\u044e\u0449\u0435\u0439 \u0444\u043e\u0440\u043c\u0443\u043b\u044b \u043c\u043e\u0436\u043d\u043e \u0432\u043e\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u044c\u0441\u044f \u0441\u0438\u043c\u0432\u043e\u043b\u0430\u043c\u0438 <b>*</b> \u0438 <b>+</b> \u0434\u043b\u044f \u043e\u0431\u043e\u0437\u043d\u0430\u0447\u0435\u043d\u0438\u044f \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u0439 \u043a\u043e\u043d\u044a\u044e\u043d\u043a\u0446\u0438\u0438 \u0438 \u0434\u0438\u0437\u044a\u044e\u043d\u043a\u0446\u0438\u0438 \u0441\u043e\u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043d\u043d\u043e.</span>' +
                    '<textarea placeholder="a \u2227 b \u2228 c" id = "secondTask">' + answers.secondTaskAnswer + '</textarea>' +
                '</div>' +

                '<div class = "info">' +
                    '<h2>\u0412\u0438\u0440\u0442\u0443\u0430\u043b\u044c\u043d\u0430\u044f \u043b\u0430\u0431\u043e\u0440\u0430\u0442\u043e\u0440\u0438\u044f "\u0411\u0443\u043b\u0435\u0432\u0430 \u0430\u043b\u0433\u0435\u0431\u0440\u0430"</h2>' +
                    '<p>\u0412 \u043f\u0435\u0440\u0432\u043e\u043c \u0437\u0430\u0434\u0430\u043d\u0438\u0438 \u0432\u0438\u0440\u0442\u0443\u0430\u043b\u044c\u043d\u043e\u0439 \u043b\u0430\u0431\u043e\u0440\u0430\u0442\u043e\u0440\u0438\u0438 \u043d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e \u0437\u0430\u043f\u043e\u043b\u043d\u0438\u0442\u044c \u0442\u0430\u0431\u043b\u0438\u0446\u0443 \u0438\u0441\u0442\u0438\u043d\u043d\u043e\u0441\u0442\u0438 \u0434\u043b\u044f \u0437\u0430\u0434\u0430\u043d\u043d\u043e\u0439 \u0431\u0443\u043b\u0435\u0432\u043e\u0439 \u0444\u0443\u043d\u043a\u0446\u0438\u0438. \u0414\u043b\u044f \u044d\u0442\u043e\u0433\u043e \u043f\u0440\u0435\u0436\u0434\u0435 \u043d\u0443\u0436\u043d\u043e \u0443\u043a\u0430\u0437\u0430\u0442\u044c \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u044f \u0442\u0430\u0431\u043b\u0438\u0446\u044b \u0434\u043b\u044f \u043f\u0440\u043e\u043c\u0435\u0436\u0443\u0442\u043e\u0447\u043d\u044b\u0445 \u0432\u044b\u0440\u0430\u0436\u0435\u043d\u0438\u0439, \u0432\u0445\u043e\u0434\u044f\u0449\u0438\u0445 \u0432 \u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0438\u0440\u0443\u044e\u0449\u0443\u044e \u0444\u0443\u043d\u043a\u0446\u0438\u044e. \u0411\u0443\u043b\u0435\u0432\u044b \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u044f \u043d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e \u0432\u0432\u0435\u0441\u0442\u0438 \u0432 \u0442\u0435\u043a\u0441\u0442\u043e\u0432\u044b\u0435 \u043f\u043e\u043b\u044f \u0441\u043e\u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u044e\u0449\u0438\u0445 \u0441\u0442\u043e\u043b\u0431\u0446\u043e\u0432 \u0442\u0430\u0431\u043b\u0438\u0446\u044b.</p>' +
                    '<p>\u0412\u043e \u0432\u0442\u043e\u0440\u043e\u043c \u0437\u0430\u0434\u0430\u043d\u0438\u0438 \u043d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e \u043f\u0440\u0438\u0432\u0435\u0441\u0442\u0438 \u0431\u0443\u043b\u0435\u0432\u0443 \u0444\u0443\u043d\u043a\u0446\u0438\u044e \u043a \u0441\u043e\u043a\u0440\u0430\u0449\u0451\u043d\u043d\u043e\u0439 \u0434\u0438\u0437\u044a\u044e\u043d\u043a\u0442\u0438\u0432\u043d\u043e\u0439 \u043d\u043e\u0440\u043c\u0430\u043b\u044c\u043d\u043e\u0439 \u0444\u043e\u0440\u043c\u0435, \u043f\u043e\u043b\u044c\u0437\u0443\u044f\u0441\u044c \u043f\u0440\u0430\u0432\u0438\u043b\u0430\u043c\u0438 \u0431\u0443\u043b\u0435\u0432\u043e\u0439 \u0430\u043b\u0433\u0435\u0431\u0440\u044b. \u041f\u043e\u043b\u0443\u0447\u0435\u043d\u043d\u043e\u0435 \u0432\u044b\u0440\u0430\u0436\u0435\u043d\u0438\u0435 \u043d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e \u0432\u0432\u0435\u0441\u0442\u0438 \u0432 \u0442\u0435\u043a\u0441\u0442\u043e\u0432\u043e\u0435 \u043f\u043e\u043b\u0435. <br> <i>\u0414\u043b\u044f \u0432\u0432\u043e\u0434\u0430 \u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0438\u0440\u0443\u044e\u0449\u0435\u0439 \u0444\u043e\u0440\u043c\u0443\u043b\u044b \u043c\u043e\u0436\u043d\u043e \u0432\u043e\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u044c\u0441\u044f \u0441\u0438\u043c\u0432\u043e\u043b\u0430\u043c\u0438 <b>*</b> \u0438 <b>+</b> \u0434\u043b\u044f \u043e\u0431\u043e\u0437\u043d\u0430\u0447\u0435\u043d\u0438\u044f \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u0439 \u043a\u043e\u043d\u044a\u044e\u043d\u043a\u0446\u0438\u0438 \u0438 \u0434\u0438\u0437\u044a\u044e\u043d\u043a\u0446\u0438\u0438 \u0441\u043e\u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043d\u043d\u043e.</i></p>' +
                '</div>' +

                '<input class = "btn btn-light" type = "button" id = "blocksChanger" value = "' + '\u0414\u0430\u043b\u0435\u0435' + '">';
            $("#jsLab").html(content);
            $(".lab-initial-second").css("display", "none");
            $(".lab-task-second").css("display", "none");
            $(".info").css("display", "none");

            let tableTRs = $("#table").find("tr");
            let currElem;
            for (let i = 3; i <= 7 ; i++) {
                for (let j = 1; j < tableTRs.length; j++) {
                    currElem = tableTRs[j].getElementsByTagName("td")[i].getElementsByTagName("input")[0];
                    currElem.style.border = "1px solid rgba(0,0,0,0)";
                    currElem.style.padding = "2px";
                    currElem.style.marginLeft = "5px";
                    currElem.value = answers.firstTaskAnswer["" + (i - 2)][j - 1];
                    currElem.addEventListener("input", function() {
                        let flag = true;
                        if (this.value != 0 && this.value != 1) {
                            this.style.border = "2px solid red";
                            this.style.padding = "1px";
                            this.style.marginLeft = "0px";
                            flag = false;
                        }
                        else {
                            this.style.border = "1px solid rgba(0,0,0,0)";
                            this.style.padding = "2px";
                            this.style.marginLeft = "5px";
                        }
                        if (flag) {
                            answers.firstTaskAnswer["" + (i - 2)][j - 1] = + this.value;
                        }
                    });
                    currElem.addEventListener("blur", function() {
                        if (this.value == "") {
                            this.style.border = "2px solid red";
                            this.style.padding = "1px";
                            this.style.marginLeft = "0px";
                        }
                    });
                }
            }
            
            $("#secondTask").on("input", function() {
                answers.secondTaskAnswer = $("#secondTask").val();
            });

            let currentBlocksChangerState = "\u0414\u0430\u043b\u0435\u0435";
            $("#blocksChanger").on("click", function() {
                switch (this.value) {
                    case "\u0414\u0430\u043b\u0435\u0435":
                        $(".lab-initial-first").css("display", "none");
                        $(".lab-initial-second").css("display", "block");
                        $(".lab-task-first").css("display", "none");
                        $(".lab-task-second").css("display", "block");
                        this.value = "\u041d\u0430\u0437\u0430\u0434";
                        currentBlocksChangerState = "\u041d\u0430\u0437\u0430\u0434";
                        break;
                    case "\u041d\u0430\u0437\u0430\u0434":
                        $(".lab-initial-second").css("display", "none");
                        $(".lab-initial-first").css("display", "block");
                        $(".lab-task-second").css("display", "none");
                        $(".lab-task-first").css("display", "block");
                        this.value = "\u0414\u0430\u043b\u0435\u0435";
                        currentBlocksChangerState = "\u0414\u0430\u043b\u0435\u0435";
                        break;
                }
            });

            $("#infoModalOpener").on("click", function () {
                if ($(".info").css("display").toLowerCase() == "none") {
                    $(".info").css("display", "block");
                    this.value = "\u0417\u0430\u043a\u0440\u044b\u0442\u044c";
                    $("#blocksChanger").css("display", "none");
                    $(".lab-initial-first").css("display", "none");
                    $(".lab-initial-second").css("display", "none");
                    $(".lab-task-first").css("display", "none");
                    $(".lab-task-second").css("display", "none");
                }
                else {
                    $(".info").css("display", "none");
                    $("#blocksChanger").css("display", "block");
                    this.value = "\u0421\u043f\u0440\u0430\u0432\u043a\u0430";
                    switch (currentBlocksChangerState) {
                        case "\u0414\u0430\u043b\u0435\u0435":
                            $(".lab-initial-second").css("display", "none");
                            $(".lab-initial-first").css("display", "block");
                            $(".lab-task-second").css("display", "none");
                            $(".lab-task-first").css("display", "block");
                            $("#blocksChanger").val("\u0414\u0430\u043b\u0435\u0435");
                            break;
                        case "\u041d\u0430\u0437\u0430\u0434":
                            $(".lab-initial-first").css("display", "none");
                            $(".lab-initial-second").css("display", "block");
                            $(".lab-task-first").css("display", "none");
                            $(".lab-task-second").css("display", "block");
                            $("#blocksChanger").val("\u041d\u0430\u0437\u0430\u0434");
                            break;
                    }
                }
            });

        },
        calculateHandler: function (text, code) {},
        getResults: function () {
            return answers;
        },
        getCondition: function () {}
    };
}

var Vlab = init_lab();