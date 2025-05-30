package org.cdwbackend.service;

import org.cdwbackend.dto.response.DashboardResponse;

import java.time.LocalDate;

public interface IDashboardService {
    DashboardResponse getDashboard(LocalDate startDate, LocalDate endDate);
}
