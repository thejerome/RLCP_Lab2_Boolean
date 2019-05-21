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
            intArray[i] = jsonArray.optInt(i);
        }
        return intArray;
    }

    private static String[] getCheckedResults(int[] solution, int answer, String task, int num) {
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

    private static String[] getCheckedResults(int[] solution, int[] answer, String task) {
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

    @Override
    public CheckingSingleConditionResult checkSingleCondition(ConditionForChecking condition, String instructions, GeneratingResult generatingResult) throws Exception {
        BigDecimal points;
        String comment = "";
//        points = new BigDecimal(1.0);

        try{
            JSONObject variant_json = new JSONObject(generatingResult.getInstructions()); // условие - generate
            int[] firstTaskVariant = getIntArrayFromJSON(variant_json.getJSONArray("firstTaskVariant"));
            //  {"firstTaskVariant":[1,3,5,7],"secondTaskVariant":10}}

            JSONObject variantForUser_json = new JSONObject(generatingResult.getCode());
            String variantForUser = variantForUser_json.getString("firstTask");

            JSONObject answers_json = new JSONObject(instructions); // ответ пользователя - из формы
            JSONObject firstTaskAnswer_json = answers_json.getJSONObject("firstTaskAnswer");
            int[] firstSequence = getIntArrayFromJSON(firstTaskAnswer_json.getJSONArray("1"));
            int[] secondSequence = getIntArrayFromJSON(firstTaskAnswer_json.getJSONArray("2"));
            int[] thirdSequence = getIntArrayFromJSON(firstTaskAnswer_json.getJSONArray("3"));
            int[] fourthSequence = getIntArrayFromJSON(firstTaskAnswer_json.getJSONArray("4"));
            int[] resultSequence = getIntArrayFromJSON(firstTaskAnswer_json.getJSONArray("5"));
            //    {
                        //    "firstTaskAnswer":{
                        //    "1":["0","1","0","00","0","0","0","0"],
                        //    "2":["0","0","1","0","0","0","0","0"],
                        //    "3":["0","0","0","1","0","0","0","0"],
                        //    "4":["0","0","0","0","0","0","0","0"],
                        //    "5":["0","1","1","1","0","0","0","1"]
                        //    },
                        //    "secondTaskAnswer":
                        //    "a*b*c+a*b*d*e+c*d"
            //    }

            String[] currentCheckedResults = new String[2];
            double trueAnswersCount = 0.0;
            currentCheckedResults = getCheckedResults(firstSequence, firstTaskVariant[0], variantForUser, 0);
            trueAnswersCount += Integer.parseInt(currentCheckedResults[0]);
            comment += currentCheckedResults[1];
//            comment += Double.toString(trueAnswersCount) + " ";

            currentCheckedResults = getCheckedResults(secondSequence, firstTaskVariant[1], variantForUser, 1);
            trueAnswersCount += Integer.parseInt(currentCheckedResults[0]);
            comment += currentCheckedResults[1];
//            comment += Double.toString(trueAnswersCount) + " ";

//            //
//            comment += Arrays.toString(secondSequence) + '\\' + Integer.toString(firstTaskVariant[1]) + "\\";
//            comment += "\\" + Integer.toString(trueAnswersCount) + "\\" + currentCheckedResults[1];
//            //


            currentCheckedResults = getCheckedResults(thirdSequence, firstTaskVariant[2], variantForUser, 2);
            trueAnswersCount += Double.parseDouble(currentCheckedResults[0]);
            comment += currentCheckedResults[1];
//            comment += Double.toString(trueAnswersCount) + " ";

            currentCheckedResults = getCheckedResults(fourthSequence, firstTaskVariant[3], variantForUser, 3);
            trueAnswersCount += Double.parseDouble(currentCheckedResults[0]);
            comment += currentCheckedResults[1];
//            comment += Double.toString(trueAnswersCount) + " ";

            currentCheckedResults = getCheckedResults(resultSequence, firstTaskVariant, variantForUser);
            trueAnswersCount += Double.parseDouble(currentCheckedResults[0]);
            comment += currentCheckedResults[1];
//            comment += Double.toString(trueAnswersCount) + " ";

            points = new BigDecimal(Math.round((0.5 * trueAnswersCount / (8 * 5)) * 100.0) / 100.0);

//          Failed, JSONObject["firstTaskAnswer"] is not a JSONObject
//            int secondTaskVariant = variant_json.getInt("secondTaskVariant");
//            String secondTaskAnswer = answers_json.getString("secondTaskAnswer");

            if (points.compareTo(new BigDecimal("1.0")) == 0){
                comment = "Решение верно";
            }
        }
        catch (JSONException e) {
            points = new BigDecimal(0.0);
            comment = "Не полностью введены значения таблицы истинности, не выполнено задание #2";
        }
        catch (Exception e) {
            points = new BigDecimal(1.0);
            comment = "Failed, " + e.getMessage();
        }






        return new CheckingSingleConditionResult(points, comment);
    }

    @Override
    public void setPreCheckResult(PreCheckResult<String> preCheckResult) {}
}
