package com.example.demo.Services;
import com.example.demo.entite.Admin;

import java.util.List;
import java.util.Optional;


public interface AdminServices {
    Admin ajouterAdmin(Admin admin);
Admin modifierAdmin(Admin admin);
List<Admin> listAdmin();
void supprimerAdmin(Long id);
Optional<Admin> getAdminById(Long id);
}
