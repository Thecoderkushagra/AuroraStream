package com.TheCoderKushagra.controller;

import com.TheCoderKushagra.dto.UserRequest;
import com.TheCoderKushagra.dto.ViewerResponse;
import com.TheCoderKushagra.entity.Roles;
import com.TheCoderKushagra.entity.UserEntity;
import com.TheCoderKushagra.entity.admin.ActionLogs;
import com.TheCoderKushagra.service.ActionLogService;
import com.TheCoderKushagra.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@Slf4j
@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private UserService userService;
    @Autowired
    private ActionLogService actionLogService;

    @GetMapping("/my-logs")
    public ResponseEntity<List<ActionLogs>> getAllAction(
            @RequestHeader("X-User-Id") String Id
    ) {
        UserEntity user = userService.getById(Id);
        List<ActionLogs> actionsLog = user.getAdminProfile().getActionsLog();
        return new ResponseEntity<>(actionsLog, HttpStatus.OK);
    }

    @PutMapping("/update-admin-username")
    public ResponseEntity<?> callUpdateName(
            @RequestHeader("X-User-Id") String Id,
            @RequestHeader("X-Username") String ogName,
            @RequestParam("newName") String name
    ) {
        if (Objects.equals(ogName, "Master_Admin_Account")) {
            return new ResponseEntity<>("Master's name can't be changed", HttpStatus.LOCKED);
        }
        ViewerResponse response = userService.changeUsername(Id, name);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/update-admin-password")
    public ResponseEntity<?> callChangePassword(
            @RequestHeader("X-User-Id") String id,
            @RequestParam("password") String password
    ) {
        ViewerResponse response = userService.changePassword(id, password);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/delete-admin")
    public ResponseEntity<String> callDeletedUser(@RequestHeader("X-User-Id") String id) {
        String response = userService.deleteUser(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //================================ PUBLISHER ================================

    @PostMapping("/create-publisher")
    public ResponseEntity<?> callSaveUser(
            @RequestHeader("X-User-Id") String Id,
            @RequestHeader("X-Username") String name,
            @RequestBody UserRequest request
    ) {
        try {
            ViewerResponse response = userService.saveUser(request, 2);
            actionLogService.addNewLog(Id, name + " Created publisher with ID: " + response.getId());
            return new ResponseEntity<>(response.getUserName()+": PUBLISHER SAVED", HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>("SOME ERROR OCCURRED", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/all-publishers")
    public ResponseEntity<?> callGetAllByRole() {
        List<?> allByRole = userService.getAllByRole(2);
        return new ResponseEntity<>(allByRole, HttpStatus.OK);
    }

    @DeleteMapping("/delete-this-pub")
    public ResponseEntity<String> deletePublisher(
            @RequestHeader("X-User-Id") String Id,
            @RequestHeader("X-User-Id") String name,
            @RequestParam("ID") String id
    ) {
        UserEntity user = userService.getById(id);
        if (user.getRole() == Roles.PUBLISHER) {
            String s = userService.deleteUser(id);
            actionLogService.addNewLog(Id, name + ": deleted publisher of ID " + user.getUserName());
            return new ResponseEntity<>(s, HttpStatus.OK);
        }
        return new ResponseEntity<>(user.getUserName()+": is not a publisher", HttpStatus.OK);
    }

    //================================ VIEWER ================================

    @GetMapping("/all-viewer")
    public ResponseEntity<?> callGetAllViewers() {
        List<?> allByRole = userService.getAllByRole(1);
        return new ResponseEntity<>(allByRole, HttpStatus.OK);
    }

    @DeleteMapping("/delete-this-viewer")
    public ResponseEntity<String> deleteViewer(
            @RequestHeader("X-User-Id") String Id,
            @RequestHeader("X-User-Id") String name,
            @RequestParam("ID") String id
    ) {
        UserEntity user = userService.getById(id);
        if (user.getRole() == Roles.VIEWER) {
            String s = userService.deleteUser(id);
            actionLogService.addNewLog(Id, name + ": deleted Viewer of ID " + user.getUserName());
            return new ResponseEntity<>(s, HttpStatus.OK);
        }
        return new ResponseEntity<>(user.getUserName()+": is not a viewer", HttpStatus.OK);
    }
}
