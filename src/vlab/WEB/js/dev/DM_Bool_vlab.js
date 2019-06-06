function init_lab() {
    const byDefault = {
        firstTask: "(¬a ∧ ¬b ∧ c) ∨ (¬a ∧ b ∧ c) ∨ (a ∧ ¬b ∧ ¬c) ∨ (a ∧ b ∧ c)",
        secondTask: "(a ∨ c) ∧ (a ∨ d) ∧ (b ∨ c) ∧ (b ∨ d) ∧ (c ∨ d) ∧ (c ∨ e)"
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
                    '<h1>Булева алгебра</h1>' +
                    '<input type="button" class="btn btn-info" id = "infoModalOpener" value = "Справка">' +
                '</div>' +
                '<div class = "lab-initial-first">' +
                    '<h2>Исходная булева функция</h2>' +
                    '<p>ƒ(a, b, c) = ' + variant.firstTask + '</p>' +
                '</div>' +

                '<div class = "lab-task-first">' +
                    '<h2>Таблица истинности</h2>' +
                    '<table class = "table table-bordered" id = "table">' +
                        '<thead>' +
                            '<td>a</td>' +
                            '<td>b</td>' +
                            '<td>c</td>' +
                            '<td>' + variant.firstTask.split(' ∨ ')[0].substring(1, variant.firstTask.split(' ∨ ')[0].indexOf(")")) + '</td>' +
                            '<td>' + variant.firstTask.split(' ∨ ')[1].substring(1, variant.firstTask.split(' ∨ ')[1].indexOf(")")) + '</td>' +
                            '<td>' + variant.firstTask.split(' ∨ ')[2].substring(1, variant.firstTask.split(' ∨ ')[2].indexOf(")")) + '</td>' +
                            '<td>' + variant.firstTask.split(' ∨ ')[3].substring(1, variant.firstTask.split(' ∨ ')[3].indexOf(")")) + '</td>' +
                            '<td>ƒ(a, b, c)</td>' +
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
                    '<h2>Исходная булева функция в КНФ</h2>' +
                    '<p>ƒ(a, b, c, e, f, g) = ' + variant.secondTask + '</p>' +
                '</div>' +
                '<div class = "lab-task-second">' +
                    '<h2>Ответ - булева функция в сокращённой ДНФ</h2>' +
                    '<span class = "alert alert-info notation">Для ввода результирующей формулы можно воспользоваться символами <b>*</b> и <b>+</b> для обозначения операций конъюнкции и дизъюнкции соответственно.</span>' +
                    '<textarea placeholder="a ∧ b ∨ c" id = "secondTask">' + answers.secondTaskAnswer + '</textarea>' +
                '</div>' +

                '<div class = "info">' +
                    '<h2>Виртуальная лаборатория "Булева алгебра"</h2>' +
                    '<p>В первом задании виртуальной лаборатории необходимо заполнить таблицу истинности для заданной булевой функции. Для этого прежде нужно указать значения таблицы для промежуточных выражений, входящих в результирующую функцию. Булевы значения необходимо ввести в текстовые поля соответствующих столбцов таблицы.</p>' +
                    '<p>Во втором задании необходимо привести булеву функцию к сокращённой дизъюнктивной нормальной форме, пользуясь правилами булевой алгебры. Полученное выражение необходимо ввести в текстовое поле. <br> <i>Для ввода результирующей формулы можно воспользоваться символами <b>*</b> и <b>+</b> для обозначения операций конъюнкции и дизъюнкции соответственно.</i></p>' +
                '</div>' +

                '<input class = "btn btn-light" type = "button" id = "blocksChanger" value = "Далее">';
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

            let currentBlocksChangerState = "Далее";
            $("#blocksChanger").on("click", function() {
                switch (this.value) {
                    case "Далее":
                        $(".lab-initial-first").css("display", "none");
                        $(".lab-initial-second").css("display", "block");
                        $(".lab-task-first").css("display", "none");
                        $(".lab-task-second").css("display", "block");
                        this.value = "Назад";
                        currentBlocksChangerState = "Назад";
                        break;
                    case "Назад":
                        $(".lab-initial-second").css("display", "none");
                        $(".lab-initial-first").css("display", "block");
                        $(".lab-task-second").css("display", "none");
                        $(".lab-task-first").css("display", "block");
                        this.value = "Далее";
                        currentBlocksChangerState = "Далее";
                        break;
                }
            });

            $("#infoModalOpener").on("click", function () {
                if ($(".info").css("display").toLowerCase() == "none") {
                    $(".info").css("display", "block");
                    this.value = "Закрыть";
                    $("#blocksChanger").css("display", "none");
                    $(".lab-initial-first").css("display", "none");
                    $(".lab-initial-second").css("display", "none");
                    $(".lab-task-first").css("display", "none");
                    $(".lab-task-second").css("display", "none");
                }
                else {
                    $(".info").css("display", "none");
                    $("#blocksChanger").css("display", "block");
                    this.value = "Справка";
                    switch (currentBlocksChangerState) {
                        case "Далее":
                            $(".lab-initial-second").css("display", "none");
                            $(".lab-initial-first").css("display", "block");
                            $(".lab-task-second").css("display", "none");
                            $(".lab-task-first").css("display", "block");
                            $("#blocksChanger").val("Далее");
                            break;
                        case "Назад":
                            $(".lab-initial-first").css("display", "none");
                            $(".lab-initial-second").css("display", "block");
                            $(".lab-task-first").css("display", "none");
                            $(".lab-task-second").css("display", "block");
                            $("#blocksChanger").val("Назад");
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