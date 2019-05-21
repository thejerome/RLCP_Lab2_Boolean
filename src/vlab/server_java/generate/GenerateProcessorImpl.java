package vlab.server_java.generate;

import org.json.JSONObject;
import java.util.Random;
import java.util.Arrays;
import java.lang.StringBuffer;

import rlcp.generate.GeneratingResult;
import rlcp.server.processor.generate.GenerateProcessor;

public class GenerateProcessorImpl implements GenerateProcessor {
    static Random random = new Random();

    private static void p(String str) {
        System.out.println(str);
    }

    private static int[] getFirstTaskVariant(int count, int min, int max)  {
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
            result = "(a ∧ b ∧ c)";
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
        temp.insert(position, "¬");
        result = temp.toString();
        return result;
    }

    private static String getFirstTask(int[] variant) {
        String result = "";
        result += createConjunction(Integer.toString(variant[0] + 8, 2).substring(1, 4).toCharArray()) + " ∨ ";
        result += createConjunction(Integer.toString(variant[1] + 8, 2).substring(1, 4).toCharArray()) + " ∨ ";
        result += createConjunction(Integer.toString(variant[2] + 8, 2).substring(1, 4).toCharArray()) + " ∨ ";
        result += createConjunction(Integer.toString(variant[3] + 8, 2).substring(1, 4).toCharArray());
        return  result;
    }

    private static String getSecondTask(int variant) {
        final String[] secondTaskVariants = new String[100];
        secondTaskVariants[0] = "(b ∨ c) ∧ (b ∨ e) ∧ (b ∨ f) ∧ (c ∨ e) ∧ (c ∨ f) ∧ (d ∨ e)";
        secondTaskVariants[1] = "(a ∨ c) ∧ (b ∨ e) ∧ (b ∨ f) ∧ (c ∨ e) ∧ (d ∨ f) ∧ (e ∨ f)";
        secondTaskVariants[2] = "(a ∨ c) ∧ (b ∨ e) ∧ (c ∨ d) ∧ (c ∨ e) ∧ (d ∨ f) ∧ (e ∨ f)";
        secondTaskVariants[3] = "(a ∨ c) ∧ (a ∨ d) ∧ (a ∨ e) ∧ (a ∨ f) ∧ (d ∨ f) ∧ (e ∨ f)";
        secondTaskVariants[4] = "(a ∨ e) ∧ (b ∨ c) ∧ (b ∨ d) ∧ (b ∨ e) ∧ (b ∨ f) ∧ (c ∨ d)";
        secondTaskVariants[5] = "(a ∨ c) ∧ (a ∨ d) ∧ (b ∨ d) ∧ (c ∨ e) ∧ (d ∨ e) ∧ (e ∨ f)";
        secondTaskVariants[6] = "(a ∨ c) ∧ (a ∨ d) ∧ (b ∨ c) ∧ (b ∨ e) ∧ (d ∨ f) ∧ (e ∨ f)";
        secondTaskVariants[7] = "(a ∨ e) ∧ (a ∨ f) ∧ (b ∨ d) ∧ (b ∨ e) ∧ (c ∨ d) ∧ (e ∨ f)";
        secondTaskVariants[8] = "(a ∨ c) ∧ (a ∨ e) ∧ (b ∨ c) ∧ (b ∨ d) ∧ (c ∨ d) ∧ (d ∨ e)";
        secondTaskVariants[9] = "(a ∨ e) ∧ (b ∨ c) ∧ (b ∨ f) ∧ (c ∨ d) ∧ (c ∨ f) ∧ (d ∨ f)";
        secondTaskVariants[10] = "(a ∨ c) ∧ (a ∨ f) ∧ (b ∨ c) ∧ (b ∨ d) ∧ (c ∨ d) ∧ (c ∨ e)";
        secondTaskVariants[11] = "(a ∨ d) ∧ (a ∨ e) ∧ (b ∨ f) ∧ (c ∨ f) ∧ (d ∨ e) ∧ (d ∨ f)";
        secondTaskVariants[12] = "(b ∨ c) ∧ (b ∨ d) ∧ (b ∨ f) ∧ (c ∨ d) ∧ (c ∨ f) ∧ (d ∨ e)";
        secondTaskVariants[13] = "(a ∨ c) ∧ (a ∨ e) ∧ (b ∨ d) ∧ (b ∨ e) ∧ (c ∨ d) ∧ (d ∨ f)";
        secondTaskVariants[14] = "(a ∨ c) ∧ (a ∨ d) ∧ (a ∨ e) ∧ (b ∨ e) ∧ (c ∨ e) ∧ (c ∨ f)";
        secondTaskVariants[15] = "(a ∨ c) ∧ (a ∨ e) ∧ (a ∨ f) ∧ (b ∨ f) ∧ (c ∨ d) ∧ (e ∨ f)";
        secondTaskVariants[16] = "(a ∨ f) ∧ (b ∨ c) ∧ (b ∨ d) ∧ (c ∨ e) ∧ (d ∨ f) ∧ (e ∨ f)";
        secondTaskVariants[17] = "(a ∨ e) ∧ (b ∨ e) ∧ (b ∨ f) ∧ (c ∨ e) ∧ (c ∨ f) ∧ (e ∨ f)";
        secondTaskVariants[18] = "(a ∨ d) ∧ (a ∨ f) ∧ (b ∨ e) ∧ (b ∨ f) ∧ (c ∨ d) ∧ (d ∨ e)";
        secondTaskVariants[19] = "(a ∨ d) ∧ (b ∨ d) ∧ (b ∨ e) ∧ (b ∨ f) ∧ (d ∨ e) ∧ (e ∨ f)";
        secondTaskVariants[20] = "(a ∨ d) ∧ (a ∨ f) ∧ (b ∨ c) ∧ (b ∨ d) ∧ (c ∨ d) ∧ (c ∨ e)";
        secondTaskVariants[21] = "(a ∨ c) ∧ (a ∨ e) ∧ (b ∨ f) ∧ (c ∨ e) ∧ (d ∨ f) ∧ (e ∨ f)";
        secondTaskVariants[22] = "(a ∨ f) ∧ (c ∨ d) ∧ (c ∨ e) ∧ (c ∨ f) ∧ (d ∨ f) ∧ (e ∨ f)";
        secondTaskVariants[23] = "(a ∨ d) ∧ (a ∨ e) ∧ (b ∨ e) ∧ (c ∨ f) ∧ (d ∨ e) ∧ (e ∨ f)";
        secondTaskVariants[24] = "(a ∨ d) ∧ (b ∨ c) ∧ (b ∨ e) ∧ (c ∨ e) ∧ (c ∨ f) ∧ (d ∨ e)";
        secondTaskVariants[25] = "(a ∨ e) ∧ (b ∨ e) ∧ (b ∨ f) ∧ (c ∨ d) ∧ (d ∨ e) ∧ (e ∨ f)";
        secondTaskVariants[26] = "(a ∨ d) ∧ (a ∨ e) ∧ (b ∨ c) ∧ (b ∨ e) ∧ (c ∨ d) ∧ (d ∨ e)";
        secondTaskVariants[27] = "(a ∨ c) ∧ (a ∨ d) ∧ (a ∨ f) ∧ (b ∨ c) ∧ (c ∨ d) ∧ (e ∨ f)";
        secondTaskVariants[28] = "(a ∨ e) ∧ (b ∨ d) ∧ (c ∨ d) ∧ (c ∨ e) ∧ (d ∨ e) ∧ (e ∨ f)";
        secondTaskVariants[29] = "(b ∨ c) ∧ (c ∨ d) ∧ (c ∨ e) ∧ (d ∨ e) ∧ (d ∨ f) ∧ (e ∨ f)";
        secondTaskVariants[30] = "(a ∨ d) ∧ (a ∨ e) ∧ (b ∨ f) ∧ (c ∨ f) ∧ (d ∨ e) ∧ (d ∨ f)";
        secondTaskVariants[31] = "(a ∨ c) ∧ (a ∨ e) ∧ (b ∨ e) ∧ (c ∨ d) ∧ (c ∨ e) ∧ (d ∨ e)";
        secondTaskVariants[32] = "(a ∨ e) ∧ (a ∨ f) ∧ (b ∨ d) ∧ (d ∨ e) ∧ (d ∨ f) ∧ (e ∨ f)";
        secondTaskVariants[33] = "(a ∨ c) ∧ (a ∨ f) ∧ (b ∨ c) ∧ (b ∨ d) ∧ (c ∨ f) ∧ (d ∨ e)";
        secondTaskVariants[34] = "(a ∨ c) ∧ (a ∨ e) ∧ (b ∨ c) ∧ (b ∨ d) ∧ (b ∨ f) ∧ (e ∨ f)";
        secondTaskVariants[35] = "(a ∨ c) ∧ (a ∨ d) ∧ (a ∨ e) ∧ (b ∨ c) ∧ (d ∨ e) ∧ (d ∨ f)";
        secondTaskVariants[36] = "(a ∨ c) ∧ (a ∨ f) ∧ (b ∨ e) ∧ (d ∨ e) ∧ (d ∨ f) ∧ (e ∨ f)";
        secondTaskVariants[37] = "(a ∨ c) ∧ (a ∨ d) ∧ (a ∨ e) ∧ (b ∨ c) ∧ (b ∨ f) ∧ (d ∨ e)";
        secondTaskVariants[38] = "(a ∨ c) ∧ (a ∨ e) ∧ (a ∨ f) ∧ (b ∨ f) ∧ (c ∨ e) ∧ (d ∨ f)";
        secondTaskVariants[39] = "(a ∨ c) ∧ (a ∨ d) ∧ (a ∨ f) ∧ (b ∨ e) ∧ (c ∨ d) ∧ (d ∨ e)";
        secondTaskVariants[40] = "(a ∨ e) ∧ (b ∨ c) ∧ (b ∨ e) ∧ (b ∨ f) ∧ (c ∨ e) ∧ (c ∨ f)";
        secondTaskVariants[41] = "(a ∨ e) ∧ (a ∨ f) ∧ (b ∨ e) ∧ (c ∨ d) ∧ (d ∨ e) ∧ (d ∨ f)";
        secondTaskVariants[42] = "(a ∨ c) ∧ (b ∨ d) ∧ (c ∨ d) ∧ (c ∨ f) ∧ (d ∨ e) ∧ (e ∨ f)";
        secondTaskVariants[43] = "(a ∨ f) ∧ (b ∨ c) ∧ (b ∨ f) ∧ (d ∨ e) ∧ (d ∨ f) ∧ (e ∨ f)";
        secondTaskVariants[44] = "(a ∨ d) ∧ (a ∨ e) ∧ (b ∨ d) ∧ (c ∨ d) ∧ (d ∨ e) ∧ (e ∨ f)";
        secondTaskVariants[45] = "(a ∨ d) ∧ (a ∨ f) ∧ (b ∨ d) ∧ (b ∨ f) ∧ (c ∨ e) ∧ (c ∨ f)";
        secondTaskVariants[46] = "(b ∨ d) ∧ (b ∨ e) ∧ (b ∨ f) ∧ (c ∨ f) ∧ (d ∨ e) ∧ (e ∨ f)";
        secondTaskVariants[47] = "(a ∨ c) ∧ (b ∨ c) ∧ (b ∨ d) ∧ (c ∨ d) ∧ (c ∨ f) ∧ (d ∨ e)";
        secondTaskVariants[48] = "(a ∨ e) ∧ (a ∨ f) ∧ (b ∨ c) ∧ (b ∨ e) ∧ (c ∨ f) ∧ (d ∨ e)";
        secondTaskVariants[49] = "(a ∨ c) ∧ (b ∨ c) ∧ (b ∨ d) ∧ (b ∨ e) ∧ (c ∨ d) ∧ (d ∨ e)";
        secondTaskVariants[50] = "(b ∨ c) ∧ (b ∨ e) ∧ (c ∨ d) ∧ (c ∨ f) ∧ (d ∨ e) ∧ (d ∨ f)";
        secondTaskVariants[51] = "(a ∨ f) ∧ (b ∨ e) ∧ (b ∨ f) ∧ (c ∨ d) ∧ (d ∨ e) ∧ (e ∨ f)";
        secondTaskVariants[52] = "(a ∨ d) ∧ (a ∨ e) ∧ (a ∨ f) ∧ (b ∨ c) ∧ (b ∨ f) ∧ (c ∨ f)";
        secondTaskVariants[53] = "(a ∨ d) ∧ (a ∨ e) ∧ (b ∨ c) ∧ (b ∨ e) ∧ (b ∨ f) ∧ (d ∨ f)";
        secondTaskVariants[54] = "(a ∨ d) ∧ (a ∨ e) ∧ (b ∨ c) ∧ (c ∨ e) ∧ (d ∨ f) ∧ (e ∨ f)";
        secondTaskVariants[55] = "(a ∨ c) ∧ (a ∨ d) ∧ (b ∨ e) ∧ (c ∨ d) ∧ (c ∨ f) ∧ (e ∨ f)";
        secondTaskVariants[56] = "(b ∨ e) ∧ (c ∨ d) ∧ (c ∨ e) ∧ (d ∨ e) ∧ (d ∨ f) ∧ (e ∨ f)";
        secondTaskVariants[57] = "(a ∨ c) ∧ (a ∨ e) ∧ (a ∨ f) ∧ (b ∨ e) ∧ (b ∨ f) ∧ (e ∨ f)";
        secondTaskVariants[58] = "(a ∨ c) ∧ (a ∨ d) ∧ (a ∨ f) ∧ (b ∨ d) ∧ (b ∨ e) ∧ (c ∨ f)";
        secondTaskVariants[59] = "(a ∨ c) ∧ (a ∨ e) ∧ (b ∨ c) ∧ (b ∨ e) ∧ (b ∨ f) ∧ (e ∨ f)";
        secondTaskVariants[60] = "(a ∨ c) ∧ (a ∨ d) ∧ (b ∨ d) ∧ (c ∨ e) ∧ (c ∨ f) ∧ (d ∨ f)";
        secondTaskVariants[61] = "(a ∨ d) ∧ (b ∨ c) ∧ (b ∨ d) ∧ (b ∨ f) ∧ (c ∨ e) ∧ (d ∨ f)";
        secondTaskVariants[62] = "(a ∨ e) ∧ (b ∨ c) ∧ (b ∨ d) ∧ (b ∨ e) ∧ (c ∨ e) ∧ (d ∨ f)";
        secondTaskVariants[63] = "(a ∨ c) ∧ (b ∨ c) ∧ (b ∨ f) ∧ (c ∨ d) ∧ (d ∨ e) ∧ (e ∨ f)";
        secondTaskVariants[64] = "(a ∨ f) ∧ (b ∨ c) ∧ (b ∨ f) ∧ (c ∨ d) ∧ (c ∨ f) ∧ (d ∨ e)";
        secondTaskVariants[65] = "(a ∨ c) ∧ (a ∨ e) ∧ (a ∨ f) ∧ (b ∨ e) ∧ (c ∨ d) ∧ (d ∨ f)";
        secondTaskVariants[66] = "(b ∨ d) ∧ (b ∨ e) ∧ (c ∨ d) ∧ (c ∨ e) ∧ (c ∨ f) ∧ (e ∨ f)";
        secondTaskVariants[67] = "(a ∨ c) ∧ (a ∨ d) ∧ (a ∨ e) ∧ (c ∨ f) ∧ (d ∨ e) ∧ (e ∨ f)";
        secondTaskVariants[68] = "(a ∨ c) ∧ (a ∨ e) ∧ (c ∨ d) ∧ (c ∨ e) ∧ (d ∨ e) ∧ (d ∨ f)";
        secondTaskVariants[69] = "(a ∨ d) ∧ (a ∨ e) ∧ (a ∨ f) ∧ (c ∨ e) ∧ (c ∨ f) ∧ (d ∨ f)";
        secondTaskVariants[70] = "(a ∨ f) ∧ (b ∨ d) ∧ (b ∨ e) ∧ (c ∨ d) ∧ (c ∨ e) ∧ (d ∨ f)";
        secondTaskVariants[71] = "(a ∨ e) ∧ (b ∨ d) ∧ (b ∨ e) ∧ (b ∨ f) ∧ (d ∨ e) ∧ (e ∨ f)";
        secondTaskVariants[72] = "(a ∨ c) ∧ (a ∨ f) ∧ (b ∨ f) ∧ (c ∨ d) ∧ (d ∨ e) ∧ (e ∨ f)";
        secondTaskVariants[73] = "(a ∨ d) ∧ (b ∨ c) ∧ (b ∨ d) ∧ (b ∨ f) ∧ (d ∨ e) ∧ (e ∨ f)";
        secondTaskVariants[74] = "(a ∨ c) ∧ (a ∨ f) ∧ (b ∨ d) ∧ (b ∨ f) ∧ (d ∨ e) ∧ (e ∨ f)";
        secondTaskVariants[75] = "(a ∨ e) ∧ (a ∨ f) ∧ (b ∨ d) ∧ (b ∨ e) ∧ (c ∨ e) ∧ (d ∨ f)";
        secondTaskVariants[76] = "(a ∨ c) ∧ (a ∨ f) ∧ (b ∨ c) ∧ (b ∨ e) ∧ (d ∨ e) ∧ (e ∨ f)";
        secondTaskVariants[77] = "(a ∨ e) ∧ (b ∨ c) ∧ (b ∨ d) ∧ (b ∨ e) ∧ (c ∨ e) ∧ (e ∨ f)";
        secondTaskVariants[78] = "(a ∨ c) ∧ (a ∨ e) ∧ (b ∨ f) ∧ (c ∨ e) ∧ (c ∨ f) ∧ (d ∨ f)";
        secondTaskVariants[79] = "(a ∨ d) ∧ (a ∨ e) ∧ (a ∨ f) ∧ (c ∨ e) ∧ (d ∨ f) ∧ (e ∨ f)";
        secondTaskVariants[80] = "(a ∨ c) ∧ (a ∨ f) ∧ (b ∨ f) ∧ (c ∨ d) ∧ (d ∨ e) ∧ (e ∨ f)";
        secondTaskVariants[81] = "(a ∨ e) ∧ (a ∨ f) ∧ (b ∨ e) ∧ (c ∨ d) ∧ (c ∨ f) ∧ (d ∨ e)";
        secondTaskVariants[82] = "(a ∨ c) ∧ (b ∨ d) ∧ (b ∨ f) ∧ (c ∨ d) ∧ (c ∨ f) ∧ (d ∨ f)";
        secondTaskVariants[83] = "(b ∨ e) ∧ (b ∨ f) ∧ (c ∨ e) ∧ (d ∨ e) ∧ (d ∨ f) ∧ (e ∨ f)";
        secondTaskVariants[84] = "(a ∨ c) ∧ (a ∨ f) ∧ (b ∨ d) ∧ (b ∨ e) ∧ (d ∨ e) ∧ (e ∨ f)";
        secondTaskVariants[85] = "(a ∨ c) ∧ (a ∨ d) ∧ (b ∨ d) ∧ (b ∨ e) ∧ (b ∨ f) ∧ (d ∨ f)";
        secondTaskVariants[86] = "(a ∨ d) ∧ (a ∨ e) ∧ (b ∨ c) ∧ (c ∨ d) ∧ (c ∨ f) ∧ (e ∨ f)";
        secondTaskVariants[87] = "(a ∨ c) ∧ (a ∨ e) ∧ (a ∨ f) ∧ (b ∨ c) ∧ (b ∨ f) ∧ (c ∨ e)";
        secondTaskVariants[88] = "(a ∨ d) ∧ (a ∨ e) ∧ (b ∨ d) ∧ (b ∨ f) ∧ (c ∨ e) ∧ (e ∨ f)";
        secondTaskVariants[89] = "(a ∨ e) ∧ (a ∨ f) ∧ (b ∨ c) ∧ (c ∨ d) ∧ (c ∨ e) ∧ (e ∨ f)";
        secondTaskVariants[90] = "(a ∨ d) ∧ (b ∨ f) ∧ (c ∨ d) ∧ (c ∨ f) ∧ (d ∨ e) ∧ (d ∨ f)";
        secondTaskVariants[91] = "(a ∨ c) ∧ (a ∨ d) ∧ (b ∨ c) ∧ (b ∨ e) ∧ (c ∨ e) ∧ (d ∨ e)";
        secondTaskVariants[92] = "(a ∨ d) ∧ (a ∨ f) ∧ (b ∨ d) ∧ (c ∨ d) ∧ (c ∨ e) ∧ (e ∨ f)";
        secondTaskVariants[93] = "(a ∨ e) ∧ (a ∨ f) ∧ (b ∨ f) ∧ (c ∨ e) ∧ (c ∨ f) ∧ (d ∨ f)";
        secondTaskVariants[94] = "(a ∨ e) ∧ (a ∨ f) ∧ (b ∨ e) ∧ (c ∨ f) ∧ (d ∨ e) ∧ (e ∨ f)";
        secondTaskVariants[95] = "(a ∨ d) ∧ (b ∨ d) ∧ (b ∨ f) ∧ (c ∨ e) ∧ (c ∨ f) ∧ (d ∨ e)";
        secondTaskVariants[96] = "(b ∨ c) ∧ (b ∨ f) ∧ (c ∨ d) ∧ (c ∨ e) ∧ (c ∨ f) ∧ (e ∨ f)";
        secondTaskVariants[97] = "(a ∨ c) ∧ (b ∨ e) ∧ (c ∨ e) ∧ (d ∨ e) ∧ (d ∨ f) ∧ (e ∨ f)";
        secondTaskVariants[98] = "(a ∨ d) ∧ (a ∨ e) ∧ (a ∨ f) ∧ (b ∨ c) ∧ (c ∨ d) ∧ (c ∨ e)";
        secondTaskVariants[99] = "(a ∨ e) ∧ (b ∨ c) ∧ (b ∨ f) ∧ (d ∨ e) ∧ (d ∨ f) ∧ (e ∨ f)";
        return secondTaskVariants[variant];
    }

    @Override
    public GeneratingResult generate(String condition) {

        JSONObject variant = new JSONObject();
        int[] firstTaskVariant = getFirstTaskVariant(4, 0, 7);
        variant.put("firstTask", getFirstTask(firstTaskVariant));

        int secondTaskVariant = random.nextInt(25);
        variant.put("secondTask", getSecondTask(secondTaskVariant));

        JSONObject dataForChecking = new JSONObject();
        dataForChecking.put("firstTaskVariant", firstTaskVariant);
        dataForChecking.put("secondTaskVariant", secondTaskVariant);

        String text = "Ваш вариант загружен в установку";
        String code = variant.toString();
        String instructions = dataForChecking.toString();

        return new GeneratingResult(text, code, instructions);
    }
}
