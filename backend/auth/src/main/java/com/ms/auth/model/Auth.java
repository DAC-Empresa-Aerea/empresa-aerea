package com.ms.auth.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "auth")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Auth {

  @Id
  private ObjectId id;

  private String login;
  private String senha;
  private String tipo;
  private String salt;
  
}
