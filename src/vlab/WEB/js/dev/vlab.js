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
        secondTaskAnswer: []
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
        setPreviosSolution: function(str){},
        setMode: function(str){},

        init: function () {
            let variant = get_variant();

            // console.log($("#previousSolution").val());
            let content = '' +
                '<div class = "header">' +
                    '<h1>Булева алгебра</h1>' +
                    // '<button type="button" class="btn btn-info" id = "infoModalOpener">Справка</button>' +
                '</div>' +
                '<div class = "lab-initial-first">' +
                    '<h2>Исходные данные</h2>' +
                    '<p>ƒ(a, b, c) = ' + variant.firstTask + '</p>' +
                '</div>' +
                '<div class = "lab-task-first">' +
                    '<h2>Задание #1</h2>' +
                    '<p>Заполните таблицу истинности по для заданной формулы. Последовательно введите сначала значения промежуточных функций, а после на основе полученных данных - результирующей.</p>' +
                '</div>' +
                '<div class = "lab-task-first">' +
                    '<h2>Таблица истинности</h2>' +
                    '<table style = "border: 1px solid #000;" id = "table">' +
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
                '<input type = "button" id = "openSecondTask" value = "Далее">';
            let container = $("#jsLab")[0];
            container.innerHTML = content;

            for (let i = 0; i < $("#table input").length; i++) {
                // $("#table input")[i].value = i;
                $("#table input")[i].style.border = "2px solid grey"
            }

            let firstTaskAnswer = {};
            $("#openSecondTask")[0].addEventListener("click", function() {
                let flag = true;
                for (let i = 0; i < $("#table input").length; i++) {
                    if ($("#table input")[i].value == "" || ($("#table input")[i].value != 0 && $("#table input")[i].value != 1)) {
                        $("#table input")[i].style.border = "2px solid red";
                        flag = false;
                    }
                    else {
                        $("#table input")[i].style.border = "2px solid grey";
                    }
                }
                if (flag) {
                    let temp_root = $("#table")[0].getElementsByTagName("tr");
                    let temp;
                    for (let i = 3; i <= 7 ; i++) {
                        temp = [];
                        for (let j = 1; j < temp_root.length; j++) {
                            temp.push(+ temp_root[j].getElementsByTagName("td")[i].getElementsByTagName("input")[0].value);
                        }
                        firstTaskAnswer["" + (i - 2)]= temp;
                    }
                    answers.firstTaskAnswer = firstTaskAnswer;
                    // console.log(answers);
                    container.innerHTML = '' +
                        '<div class = "header">' +
                            '<h1>Булева алгебра</h1>' +
                        '</div>' +
                        '<div class = "lab-task-first">' +
                            '<h2>Задание #2</h2>' +
                            '<p>Приведите заданную функцию к сокращенной дизъюнктивной нормальной форме. Введите полученный результат в поле.</p>' +
                            '<span>Примечение: в ответе можно заменить символ конъюнкции на "*", а символ дизъюнкции на "+".</span>' +
                        '</div>' +
                        '<div class = "lab-initial-second">' +
                            '<h2>Исходные данные</h2>' +
                            '<p>ƒ(a, b, c, e, f) = ' + variant.secondTask + '</p>' +
                        '</div>' +
                        '<div class = "lab-task-second">' +
                            '<h2>Ответ</h2>' +
                            '<textarea placeholder="x * z + y * z" style = "resize: none; width: 400px; min-height: 50px;" id = "secondTask"></textarea>' +
                        '</div>';
                    $("#secondTask")[0].addEventListener("input", function() {
                        answers.secondTaskAnswer = $("#secondTask").val();
                    })
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