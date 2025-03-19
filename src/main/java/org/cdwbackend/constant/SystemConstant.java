package org.cdwbackend.constant;

import lombok.experimental.UtilityClass;

@UtilityClass
public class SystemConstant {
    public final String ADMIN_ROLE = "admin";
    public final String USER_ROLE = "user";
    public final String ORDER_PROCESSING = "PROCESSING";
    public final String ORDER_TRANSPORTING = "TRANSPORTING";
    public final String ORDER_DELIVERED = "DELIVERED";
    public final String ORDER_CANCELED = "CANCELED";
    public final String REFRESH_TOKEN = "refresh_token";
}
