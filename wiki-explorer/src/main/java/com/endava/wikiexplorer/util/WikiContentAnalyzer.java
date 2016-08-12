package com.endava.wikiexplorer.util;

import com.endava.wikiexplorer.dto.WikiDTO;

import java.util.HashMap;
import java.util.Map;

/**
 * Ionut Ciuta on 8/11/2016.
 */
//todo delete all and use TreeMap
public class WikiContentAnalyzer {
    private static final String SPACE = " ";

    private static Map<String, Integer> countArticleWords(String articleText) {
        Map<String, Integer> wordCounter = new HashMap<>();
        String[] words = articleText.split(SPACE);

        for(String word : words) {
            String lowerWord = word.toLowerCase();

            if(!wordCounter.containsKey(lowerWord)) {
                wordCounter.put(lowerWord, 1);
            } else {
                int previousCount = wordCounter.get(lowerWord);
                wordCounter.put(lowerWord, ++previousCount);
            }
        }

        return wordCounter;
    }

    public static WikiContentAnalysis analyzeContentSerial(WikiDTO wikiDTO) {
        String cleanText = WikiContentParser.parse(wikiDTO.getWikiFromatContent());
        return new WikiContentAnalysis(countArticleWords(cleanText));
    }
}
