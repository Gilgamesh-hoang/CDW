package org.cdwbackend.util;
public class SlugUtil {
    public static String generateUniqueSlugByOrderId(Long orderId) {
        String randomStr1 = generateRandomString(5);
        String randomStr2 = generateRandomString(5);
        
        // Combine all parts with hyphens
        return String.format("%s-%s-%s", randomStr1, orderId, randomStr2);
    }
    
    private static String generateRandomString(int length) {
        String chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int index = (int) (Math.random() * chars.length());
            sb.append(chars.charAt(index));
        }
        return sb.toString();
    }
}