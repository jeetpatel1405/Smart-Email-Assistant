package com.emailassistant;


import com.emailassistant.app.EmailRequest;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value; // ✅ This is what you need
import org.springframework.web.reactive.function.client.WebClient;


import java.util.HashMap;
import java.util.Map;
@Service


public class EmailGeneratorService {

    private final WebClient webClient;

    @Value("${gemini.api.url}")

    private String geminiApiurl;
    @Value("${gemini.api.key}")
    private String geminiApiKey;

    public EmailGeneratorService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build() ;
    }

    public String generateEmailReply(EmailRequest emailRequest){



        // Build the prompt
        String prompt = buildPrompt(emailRequest);

        // Craft the request
        Map<String,Object> requestBody = Map.of(
                "contents", new Object[]{
                        Map.of("parts", new Object[]{
                                Map.of("text",prompt)
                        })
                }
        );

        // Get response
        System.out.println(geminiApiurl);
        System.out.println(geminiApiKey);
        String response = webClient.post()
                .uri(geminiApiurl + geminiApiKey)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();
        return extractResponseContent(response);


    }

//    private String extractResponseContent(String response) {
//        try{
//            ObjectMapper objectMapper = new ObjectMapper();
//            JsonNode jsonNode = objectMapper.readTree(response);
//            return jsonNode.path("candidates")
//                    .get(0)
//                    .path("content")
//                    .get(0)
//                    .path("text")
//                    .asText();
//
//
//
//
//        }
//        catch(Exception e){
//            return "Error processing response :"   +e.getMessage();
//
//        }
//    }
private String extractResponseContent(String response) {
    try {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode root = objectMapper.readTree(response);

        JsonNode candidatesNode = root.path("candidates");
        if (!candidatesNode.isArray() || candidatesNode.isEmpty()) {
            return "No candidates found in response.";
        }

        JsonNode contentNode = candidatesNode.get(0).path("content");
        if (!contentNode.isArray() || contentNode.isEmpty()) {
            return "No content in first candidate.";
        }

        return contentNode.get(0).path("text").asText("No text found.");

    } catch (Exception e) {
        return "Error processing response: " + e.getMessage();
    }
}


    private String buildPrompt(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Generate a professional email reply for hte following email content. Please generate the subject line");

        if(emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()) {
            prompt.append("Use a " + emailRequest.getTone()).append(" tone.");

        }
        prompt.append("\nOriginal Email:\n").append(emailRequest.getEmailContent());
        return prompt.toString();
    }


}
