package org.cdwbackend.controller.admin;

import org.cdwbackend.service.IDashboardService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;

import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.cdwbackend.dto.response.ResponseObject;
import org.springframework.http.HttpStatus;
import lombok.RequiredArgsConstructor;
import org.cdwbackend.dto.response.DashboardResponse;

import java.time.LocalDate;
import java.util.Optional;

@RestController("AdminDashboardController")
@RequestMapping("${API_PREFIX}/admin/dashboard")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Validated
public class DashboardController {
    IDashboardService dashboardService;
    
    @GetMapping
    public ResponseObject<DashboardResponse> getDashboard(
            @RequestParam(required = false) Optional<String> startDate,
            @RequestParam(required = false) Optional<String> endDate) {
        
        LocalDate start = startDate.map(LocalDate::parse).orElse(LocalDate.now().minusMonths(1));
        LocalDate end = endDate.map(LocalDate::parse).orElse(LocalDate.now());
        
        DashboardResponse response = dashboardService.getDashboard(start, end);
                
        return new ResponseObject<>(HttpStatus.OK, "Dashboard data retrieved successfully", response);
    }
}
