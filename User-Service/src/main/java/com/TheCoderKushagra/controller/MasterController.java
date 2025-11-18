package com.TheCoderKushagra.controller;

import com.TheCoderKushagra.dto.UserRequest;
import com.TheCoderKushagra.dto.ViewerResponse;
import com.TheCoderKushagra.entity.Roles;
import com.TheCoderKushagra.entity.UserEntity;
import com.TheCoderKushagra.service.ActionLogService;
import com.TheCoderKushagra.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/master")

@Slf4j
public class MasterController {
    @Autowired
    private UserService userService;
    @Autowired
    private ActionLogService actionLogService;

    @PutMapping("/update-master-password")
    public ResponseEntity<?> callChangePassword(
            @RequestHeader("X-User-Id") String Id,
            @RequestParam("password") String password
    ) {
        ViewerResponse response = userService.changePassword(Id, password);
        actionLogService.addNewLog(Id, "Master changed his password.");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/create-admin")
    public ResponseEntity<?> callSaveUser(
            @RequestHeader("X-User-Id") String Id,
            @RequestBody UserRequest request
    ) {
        try {
            ViewerResponse response = userService.saveUser(request, 3);
            actionLogService.addNewLog(Id,"MASTER HAS ADDED NEW ADMIN WITH ID: " + response.getId());
            return new ResponseEntity<>(response.getUserName()+": ADMIN SAVED", HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>("SOME ERROR OCCURRED", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get-all-admin")
    public ResponseEntity<?> callGetAllViewers() {
        List<?> allByRole = userService.getAllByRole(3);
        return new ResponseEntity<>(allByRole, HttpStatus.OK);
    }

    @DeleteMapping("/delete-this-admin")
    public ResponseEntity<String> deletePublisher(@RequestParam("id") String id) {
        UserEntity user = userService.getById(id);
        if (user.getRole() == Roles.ADMIN) {
            String s = userService.deleteUser(id);
            return new ResponseEntity<>(s, HttpStatus.OK);
        }
        return new ResponseEntity<>(user.getUserName()+": is not an ADMIN", HttpStatus.OK);
    }

}
