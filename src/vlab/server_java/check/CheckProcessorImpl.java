package vlab.server_java.check;

import java.math.BigDecimal;
import java.util.Arrays;

import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONArray;

import rlcp.check.ConditionForChecking;
import rlcp.generate.GeneratingResult;
import rlcp.server.processor.check.CheckProcessor;
import rlcp.server.processor.check.PreCheckProcessor;
import rlcp.server.processor.check.PreCheckProcessor.PreCheckResult;
import rlcp.server.processor.check.PreCheckResultAwareCheckProcessor;

public class CheckProcessorImpl implements PreCheckResultAwareCheckProcessor<String> {
    private static int[] getIntArrayFromJSON(JSONArray jsonArray){
        int[] intArray = new int[jsonArray.length()];
        for (int i = 0; i < intArray.length; i++) {
            intArray[i] = jsonArray.getInt(i);
        }
        return intArray;
    }

    private static String[] checkTruthTable(int[] solution, int answer, String task, int num) {
        String[] result = new String[2];
        int N = 8;
        int[] trueSequence = new int[N]; trueSequence[answer] = 1;
        String comment = "";
        int trueAnswersCount = 0;
        char[] temp;
        for (int i = 0; i < N; i++) {
            if (solution[i] == trueSequence[i]) {
                trueAnswersCount += 1;
            }
            else {
                temp =  Integer.toString(i + 8, 2).toCharArray();
                comment += "(" + temp[1] + ", " + temp[2] + ", " + temp[3] + "), ";
            }
        }
        result[0] = Integer.toString(trueAnswersCount);
        result[1] = "";
        if (trueAnswersCount != N) {
            String endOfWord = "";
            if (N - trueAnswersCount > 1.0) {
                endOfWord = "ях";
            }
            else {
                endOfWord = "и";
            }
            result[1] += "Ошибка в расчётах ƒ = " + task.split(" ∨ ")[num].substring(1, task.split(" ∨ ")[num].indexOf(")")) + " при значени" + endOfWord + " " + comment.substring(0, comment.length() - 2) + ".\n";
        }
        return result;
    }

    private static String[] checkTruthTable(int[] solution, int[] answer, String task) {
        String[] result = new String[2];
        int N = 8;
        int[] trueSequence = new int[N]; for (int i =0; i < answer.length; i ++) {trueSequence[answer[i]] = 1;}
        String comment = "";
        int trueAnswersCount = 0;
        char[] temp;
        for (int i = 0; i < N; i++) {
            if (solution[i] == trueSequence[i]) {
                trueAnswersCount += 1;
            }
            else {
                temp =  Integer.toString(i + 8, 2).toCharArray();
                comment += "(" + temp[1] + ", " + temp[2] + ", " + temp[3] + "), ";
            }
        }
        result[0] = Integer.toString(trueAnswersCount);
        result[1] = "";
        if (trueAnswersCount != N) {
            String endOfWord = "";
            if (N - trueAnswersCount > 1.0) {
                endOfWord = "ях";
            }
            else {
                endOfWord = "и";
            }
            result[1] += "Ошибка в расчётах результирующей функции ƒ = " + task + " при значени" + endOfWord + " " + comment.substring(0, comment.length() - 2) + ".\n";
        }
        return result;
    }

    private static String deleteSpaces(String expression) {
        String[] parts = expression.split(" ");
        String result = "";
        for (int i = 0; i < parts.length; i++) {
            result += parts[i];
        }
        return result;
    }

    private static String exchangeOperationSigns(String expression) {
        String result = expression;
        while (isContainsInStr(result, "+")) {
            result = replaceInStr(result, "+", "∨");
        }
        while (isContainsInStr(result, "*")) {
            result = replaceInStr(result, "*", "∧");
        }
        while (isContainsInStr(result, "(")) {
            result = replaceInStr(result, "(", "");
        }
        while (isContainsInStr(result, ")")) {
            result = replaceInStr(result, ")", "");
        }
        return result;
    }

    private static boolean isContainsInStr(String str, String elem) {
        boolean result = true;
        if (str.indexOf(elem) == -1) {
            result = false;
        }
        return result;
    }

    private static String replaceInStr(String str, String elem, String elemToPut) {
        String result;
        result = str.substring(0, str.indexOf(elem)) + elemToPut + str.substring(str.indexOf(elem) + elem.length(), str.length());
        return result;
    }

    private static boolean isTrueDNF(String expression) {
        boolean result = true;
        if (expression.length() > 0) {
            String[] temp = expression.split("∨");
            for (int i = 0; i < temp.length; i++) {
                if (isContainsInStr(temp[i], "∨") || !isContainsInStr(temp[i], "∧")) {
                    throw new NullPointerException("Формула не соответствует виду ДНФ");
                }
            }
            if (!checkAllSimbols(expression)) {
                throw new NullPointerException("В полученной формуле присутствуют символы, не распознанные как обозначение переменной или знак конъюнкции или дизъюнкции.");
            }
        }
        else
            throw new NullPointerException("В качестве ответа получена пустая строка.");
        return true;
    }

    private static boolean checkAllSimbols(String expression) {
        char[] temp = expression.toCharArray();
        for (int i = 0; i < temp.length; i++) {
            switch (temp[i]) {
                case 'a':
                case 'b':
                case 'c':
                case 'd':
                case 'e':
                case 'f':
                case 'g':
                case '∨':
                case '∧':
                    break;
                default:
                    return false;
            }
        }
        return true;
    }

    private static int[] getTruthTable(String expression, String mode) {
        int[] result = new int[128];
        int index = 0;
        for (int a = 0; a <= 1; a++) {
            for (int b = 0; b <= 1; b++) {
                for (int c = 0; c <= 1; c++) {
                    for (int d = 0; d <= 1; d++) {
                        for (int e = 0; e <= 1; e++) {
                            for (int f = 0; f <= 1; f++) {
                                for (int g = 0; g <= 1; g++) {
                                    result[index] = getBooleanFunResult(expression, mode, a, b, c, d, e, f, g);
                                    index++;
                                }
                            }
                        }
                    }
                }
            }
        }
        return result;
    }

    private static int getBooleanFunResult(String expression, String mode, int a, int b, int c, int d, int e, int f, int g) {
        int result;
        int resultOfPart;
        String[] variables;
        switch (mode) {
            case "CNF":
                String[] conjunctions = expression.split("∧");
                result = 1;
                for (int i = 0; i < conjunctions.length; i++) {
                    variables = conjunctions[i].substring(1, conjunctions[i].length() - 1).split("∨");
                    resultOfPart = 0;
                    for (int j = 0; j < variables.length; j++) {
                        switch (variables[j].charAt(0)) {
                            case 'a':
                                resultOfPart += a;
                                break;
                            case 'b':
                                resultOfPart += b;
                                break;
                            case 'c':
                                resultOfPart += c;
                                break;
                            case 'd':
                                resultOfPart += d;
                                break;
                            case 'e':
                                resultOfPart += e;
                                break;
                            case 'f':
                                resultOfPart += f;
                                break;
                            case 'g':
                                resultOfPart += g;
                                break;
                            default:
                                throw new IllegalArgumentException("Unresolved sign at getBooleanFun().\n");
                        }
                    }
                    if (resultOfPart > 1) {
                        resultOfPart = 1;
                    }
                    result *= resultOfPart;
                }
                return result;
            case "DNF":
                String[] disjunctions = expression.split("∨");
                result = 0;
                for (int i = 0; i < disjunctions.length; i++) {
                    variables = disjunctions[i].split("∧");
                    resultOfPart = 1;
                    for (int j = 0; j < variables.length; j++) {
                        switch (variables[j].charAt(0)) {
                            case 'a':
                                resultOfPart *= a;
                                break;
                            case 'b':
                                resultOfPart *= b;
                                break;
                            case 'c':
                                resultOfPart *= c;
                                break;
                            case 'd':
                                resultOfPart *= d;
                                break;
                            case 'e':
                                resultOfPart *= e;
                                break;
                            case 'f':
                                resultOfPart *= f;
                                break;
                            case 'g':
                                resultOfPart *= g;
                                break;
                            default:
                                throw new IllegalArgumentException("Unresolved sign at getBooleanFun().\n");
                        }
                    }
                    result += resultOfPart;
                }
                if (result > 1) {
                    result = 1;
                }
                return result;
        }
        throw new IllegalArgumentException("Unresolved mode at getBooleanFun().\n");
    }

    @Override
    public CheckingSingleConditionResult checkSingleCondition(ConditionForChecking condition, String instructions, GeneratingResult generatingResult) throws Exception {
        BigDecimal points;
        String comment = "";
        double firstTaskPoints, secondTaskPoints;

        try{
            JSONObject variant_json = new JSONObject(generatingResult.getInstructions());
            int[] firstTaskVariant = getIntArrayFromJSON(variant_json.getJSONArray("firstTaskVariant"));

            JSONObject variantForUser_json = new JSONObject(generatingResult.getCode());
            String variantForUser = variantForUser_json.getString("firstTask");

            JSONObject answers_json = new JSONObject(instructions);
            JSONObject firstTaskAnswer_json = answers_json.getJSONObject("firstTaskAnswer");
            int[] firstSequence = getIntArrayFromJSON(firstTaskAnswer_json.getJSONArray("1"));
            int[] secondSequence = getIntArrayFromJSON(firstTaskAnswer_json.getJSONArray("2"));
            int[] thirdSequence = getIntArrayFromJSON(firstTaskAnswer_json.getJSONArray("3"));
            int[] fourthSequence = getIntArrayFromJSON(firstTaskAnswer_json.getJSONArray("4"));
            int[] resultSequence = getIntArrayFromJSON(firstTaskAnswer_json.getJSONArray("5"));

            if (firstSequence.length == 8 && secondSequence.length == 8 && thirdSequence.length == 8 && fourthSequence.length == 8 && resultSequence.length == 8) {
                String[] currentCheckedResults;
                double trueAnswersCount = 0.0;

                currentCheckedResults = checkTruthTable(firstSequence, firstTaskVariant[0], variantForUser, 0);
                trueAnswersCount += Integer.parseInt(currentCheckedResults[0]);
                comment += currentCheckedResults[1];

                currentCheckedResults = checkTruthTable(secondSequence, firstTaskVariant[1], variantForUser, 1);
                trueAnswersCount += Integer.parseInt(currentCheckedResults[0]);
                comment += currentCheckedResults[1];

                currentCheckedResults = checkTruthTable(thirdSequence, firstTaskVariant[2], variantForUser, 2);
                trueAnswersCount += Double.parseDouble(currentCheckedResults[0]);
                comment += currentCheckedResults[1];

                currentCheckedResults = checkTruthTable(fourthSequence, firstTaskVariant[3], variantForUser, 3);
                trueAnswersCount += Double.parseDouble(currentCheckedResults[0]);
                comment += currentCheckedResults[1];

                currentCheckedResults = checkTruthTable(resultSequence, firstTaskVariant, variantForUser);
                trueAnswersCount += Double.parseDouble(currentCheckedResults[0]);
                comment += currentCheckedResults[1];

                firstTaskPoints = 0.5 * trueAnswersCount / (8 * 5);
            }
            else {
                firstTaskPoints = 0.0;
                comment += "Не полностью или неверно введены значения таблицы истинности.\n";
            }
        }
        catch (JSONException e) {
            firstTaskPoints = 0.0;
            comment += "Не полностью или неверно введены значения таблицы истинности.\n";
        }
        catch (Exception e) {
            return new CheckingSingleConditionResult(new BigDecimal(1.0), "Failed, " + e.getMessage());
        }

        try {
            JSONObject variant_json = new JSONObject(generatingResult.getInstructions());
            String secondTaskVariant = variant_json.getString("secondTaskVariant");

            JSONObject answers_json = new JSONObject(instructions);
            String secondTaskAnswer = answers_json.getString("secondTaskAnswer");

            secondTaskVariant = deleteSpaces(secondTaskVariant);
            secondTaskAnswer = exchangeOperationSigns(deleteSpaces(secondTaskAnswer));

            if (isTrueDNF(secondTaskAnswer)) {
                int[] CNFtruthTable = getTruthTable(secondTaskVariant, "CNF");
                int[] DNFtruthTable = getTruthTable(secondTaskAnswer, "DNF");
                for (int i = 0; i < 128; i++) {
                    if (CNFtruthTable[i] != DNFtruthTable[i]) {
                        throw new NullPointerException("В полученной формуле сокращённой ДНФ допущена ошибка.");
                    }
                }
            }
            secondTaskPoints = 0.5;
        }
        catch (NullPointerException e) {
            secondTaskPoints = 0.0;
            comment += e.getMessage();
        }
        catch (Exception e) {
            return new CheckingSingleConditionResult(new BigDecimal(1.0), "Failed, " + e.getMessage());
        }

        points = new BigDecimal(Math.round((firstTaskPoints + secondTaskPoints) * 100.0) / 100.0);
        if (points.compareTo(new BigDecimal("1.0")) == 0){
            comment = "Решение верно";
        }

        return new CheckingSingleConditionResult(points, comment);
    }

    @Override
    public void setPreCheckResult(PreCheckResult<String> preCheckResult) {}
}
