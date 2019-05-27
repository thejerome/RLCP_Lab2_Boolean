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

    function get_variant() {
        let variant;
        if ($("#preGeneratedCode").val()) {
            variant = parse_variant($("#preGeneratedCode").val(), byDefault);
        }
        else {
            variant = byDefault;
        }
        return variant;
    }

    function parse_variant(str, def_obj) {
        let parse_str;
        if (typeof str === 'string' && str !== "") {
            try {
                parse_str = JSON.parse(str);
            } catch (e) {
                if (def_obj){
                    parse_str = def_obj;
                } else {
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
        setVariant : function(str){},
        setPreviosSolution: function(str){
            return answers;
        },
        setMode: function(str){},

        init: function () {
            let variant = get_variant();

            console.log($("#previousSolution").val());
            let content = '' +
                '<div class = "header">' +
                    '<h1>Булева алгебра</h1>' +
                    '<button type="button" class="btn btn-info" id = "infoModalOpener">Справка</button>' +
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
                    '<span class = "alert alert-info notation"><h3 class = "alert-heading">Примечание</h3>Для ввода результирующей формулы можно воспользоваться символами <b>*</b> и <b>+</b> для обозначения операций конъюнкции и дизъюнкции соответственно.</span>' +
                    '<textarea placeholder="a * b + c" id = "secondTask"></textarea>' +
                '</div>' +

                '<div class = "info">' +
                    '<h2>Виртуальная лаборатория "Булева алгебра"</h2>' +
                    '<p>В первом задании виртуальной лаборатории необходимо заполнить таблицу истинности для заданной булевой функции. Для этого прежде нужно указать значения таблицы для промежуточных выражений, входящих в результирующую функцию. Булевы значения необходимо ввести в текстовые поля соответствующих столбцов таблицы.</p>' +
                    '<p>Во втором задании необходимо привести булеву функцию к сокращённой дизъюнктивной нормальной форме, пользуясь правилами булевой алгебры. Полученное выражение необходимо ввести в текстовое поле.</p>' +
                '</div>' +

                '<input class = "btn btn-light" type = "button" id = "blocksChanger" value = "Далее">';
            let container = $("#jsLab")[0];
            container.innerHTML = content;
            $(".lab-initial-second")[0].style.display = "none";
            $(".lab-task-second")[0].style.display = "none";
            $(".info")[0].style.display = "none";

            let tableTRs = $("#table")[0].getElementsByTagName("tr");
            let currElem;
            for (let i = 3; i <= 7 ; i++) {
                for (let j = 1; j < tableTRs.length; j++) {
                    currElem = tableTRs[j].getElementsByTagName("td")[i].getElementsByTagName("input")[0];
                    // answers.firstTaskAnswer["" + (i - 2)][j - 1] = currElem.value;
                    currElem.style.border = "1px solid rgba(0,0,0,0)";
                    currElem.style.padding = "2px";
                    currElem.style.marginLeft = "5px";
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
            $("#secondTask")[0].addEventListener("input", function() {
                answers.secondTaskAnswer = $("#secondTask").val();
            });

            let currentBlocksChangerState = "Далее";
            $("#blocksChanger")[0].addEventListener("click", function() {
                switch (this.value) {
                    case "Далее":
                        $(".lab-initial-first")[0].style.display = "none";
                        $(".lab-initial-second")[0].style.display = "block";
                        $(".lab-task-first")[0].style.display = "none";
                        $(".lab-task-second")[0].style.display = "block";
                        this.value = "Назад";
                        currentBlocksChangerState = "Назад";
                        break;
                    case "Назад":
                        $(".lab-initial-second")[0].style.display = "none";
                        $(".lab-initial-first")[0].style.display = "block";
                        $(".lab-task-second")[0].style.display = "none";
                        $(".lab-task-first")[0].style.display = "block";
                        this.value = "Далее";
                        currentBlocksChangerState = "Далее";
                        break;
                    case "Закрыть":
                        $(".info")[0].style.display = "none";
                        switch (currentBlocksChangerState) {
                            case "Далее":
                                $(".lab-initial-second")[0].style.display = "none";
                                $(".lab-initial-first")[0].style.display = "block";
                                $(".lab-task-second")[0].style.display = "none";
                                $(".lab-task-first")[0].style.display = "block";
                                this.value = "Далее";
                                break;
                            case "Назад":
                                $(".lab-initial-first")[0].style.display = "none";
                                $(".lab-initial-second")[0].style.display = "block";
                                $(".lab-task-first")[0].style.display = "none";
                                $(".lab-task-second")[0].style.display = "block";
                                this.value = "Назад";
                                break;
                        }
                        break;
                }


            });
            $("#infoModalOpener")[0].addEventListener("click", function () {
                $(".info")[0].style.display = "block";
                $("#blocksChanger")[0].value = "Закрыть";
                $(".lab-initial-first")[0].style.display = "none";
                $(".lab-initial-second")[0].style.display = "none";
                $(".lab-task-first")[0].style.display = "none";
                $(".lab-task-second")[0].style.display = "none";
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