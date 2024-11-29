package com.example.sampleproject.model;

public enum ERole {
    ROLE_USER("User"),
    ROLE_MODERATOR("Moderator"),
    ROLE_ADMIN("Administrator"),
    ROLE_SUPPORT("Support Staff"),
    ROLE_ANALYTICS("Analytics Viewer");

    private final String displayName;

    ERole(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}