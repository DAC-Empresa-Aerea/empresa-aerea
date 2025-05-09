package com.ms.auth.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

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

  @Field(name = "login")
  private String login;

  @Field(name = "senha")
  private String password;

  @Field(name = "tipo")
  private String role;

  @Field(name = "salt")
  private String salt;
  
}
