package vlab.server_java.generate;

import org.json.JSONObject;
import java.util.Random;
import java.util.Arrays;
import java.lang.StringBuffer;

import rlcp.generate.GeneratingResult;
import rlcp.server.processor.generate.GenerateProcessor;

public class GenerateProcessorImpl implements GenerateProcessor {
    static Random random = new Random();

    private static int[] getArrayWithoutDuplicates(int count, int min, int max)  {
        int[] result = new int[count];
        int nextRandom;
        for (int i = 0; i < result.length; i++) {
            nextRandom = min + random.nextInt(max - min + 1);
            while (isContains(result, nextRandom)) {
                nextRandom = min + random.nextInt(max - min + 1);
            }
            result[i] = nextRandom;
        }
        Arrays.sort(result);
        return result;
    }

    private static boolean isContains(int[] arr, int elem) {
        boolean result = false;
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == elem) {
                result = true;
            }
        }
        return result;
    }

    private static String createConjunction(char[] conjunction) {
        String result = "";
        if (conjunction.length != 3) {
            throw new NullPointerException("Error on createConjunction!");
        }
        else {
            result = "(a * b * c)";
            if (Character.getNumericValue(conjunction[0]) != 1) {
                result = insertNegationsIntoConjunctions(result, result.indexOf("a"));
            }
            if (Character.getNumericValue(conjunction[1]) != 1) {
                result = insertNegationsIntoConjunctions(result, result.indexOf("b"));
            }
            if (Character.getNumericValue(conjunction[2]) != 1) {
                result = insertNegationsIntoConjunctions(result, result.indexOf("c"));
            }
        }
        return result;
    }

    private static String insertNegationsIntoConjunctions (String str, int position) {
        String result;
        StringBuffer temp = new StringBuffer(str);
        temp.insert(position, "!");
        result = temp.toString();
        return result;
    }

    private static String getFirstTask(int[] variant) {
        String result = "";
        result += createConjunction(Integer.toString(variant[0] + 8, 2).substring(1, 4).toCharArray()) + " + ";
        result += createConjunction(Integer.toString(variant[1] + 8, 2).substring(1, 4).toCharArray()) + " + ";
        result += createConjunction(Integer.toString(variant[2] + 8, 2).substring(1, 4).toCharArray()) + " + ";
        result += createConjunction(Integer.toString(variant[3] + 8, 2).substring(1, 4).toCharArray());
        return  result;
    }

    private static String getSecondTask(int[] randomPairs) {
        String result = "";
        for (int i = 0; i < randomPairs.length; i++) {
            result += getPair(randomPairs[i]) + " * ";
        }
        return result.substring(0, result.length() - 3);
    }

    private static String getPair(int num) {
        final int N = 21;
        final String[] pairs = new String[N];
        pairs[0] = "(a + b)";
        pairs[1] = "(a + c)";
        pairs[2] = "(a + d)";
        pairs[3] = "(a + e)";
        pairs[4] = "(a + f)";
        pairs[5] = "(a + g)";

        pairs[6] = "(b + c)";
        pairs[7] = "(b + d)";
        pairs[8] = "(b + e)";
        pairs[9] = "(b + f)";
        pairs[10] = "(b + g)";

        pairs[11] = "(c + d)";
        pairs[12] = "(c + e)";
        pairs[13] = "(c + f)";
        pairs[14] = "(c + g)";

        pairs[15] = "(d + e)";
        pairs[16] = "(d + f)";
        pairs[17] = "(d + g)";

        pairs[18] = "(e + f)";
        pairs[19] = "(e + g)";

        pairs[20] = "(f + g)";

        if (num < N) {
            return pairs[num];
        }
        else {
            throw new NullPointerException("Error on getPair!");
        }
    }

    @Override
    public GeneratingResult generate(String condition) {

        JSONObject variant = new JSONObject();
        int[] firstTaskVariant = getArrayWithoutDuplicates(4, 0, 7);
        variant.put("firstTask", getFirstTask(firstTaskVariant));

        int[] secondTaskVariant = getArrayWithoutDuplicates(7, 0, 20);
        variant.put("secondTask", getSecondTask(secondTaskVariant));

        JSONObject dataForChecking = new JSONObject();
        dataForChecking.put("firstTaskVariant", firstTaskVariant);
        dataForChecking.put("secondTaskVariant", getSecondTask(secondTaskVariant));

        String text = "Ваш вариант загружен в установку";
        String code = variant.toString();
        String instructions = dataForChecking.toString();

        return new GeneratingResult(text, code, instructions);
    }
}
