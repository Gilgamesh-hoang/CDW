package org.cdwbackend.controller.admin;


import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.cdwbackend.dto.CategoryDTO;
import org.cdwbackend.dto.SizeDTO;
import org.cdwbackend.dto.request.CreateCategoryRequest;
import org.cdwbackend.dto.request.SizeRequest;
import org.cdwbackend.dto.request.UpdateCategoryRequest;
import org.cdwbackend.dto.response.ResponseObject;
import org.cdwbackend.service.ICategoryService;
import org.cdwbackend.service.ISizeService;
import org.hibernate.validator.constraints.Range;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController("AdminSizeController")
@RequestMapping("${API_PREFIX}/admin/sizes")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Validated
public class SizeController {
    ISizeService sizeService;

    @PostMapping
    public ResponseObject<SizeDTO> createCategory(@RequestBody @Valid SizeRequest request) {
        return new ResponseObject<>(HttpStatus.CREATED, sizeService.save(request));
    }

    @GetMapping("/exists")
    public ResponseObject<Boolean> existsCategory(@RequestParam("name") String name) {
        return new ResponseObject<>(HttpStatus.OK, sizeService.existsByName(name));
    }

    @DeleteMapping("/{id}")
    public ResponseObject<Void> deleteCategory(@PathVariable @Range(min = 1) Long id) {
        sizeService.delete(id);
        return new ResponseObject<>(HttpStatus.OK);
    }
}
