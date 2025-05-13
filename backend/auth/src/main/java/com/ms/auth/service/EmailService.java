package com.ms.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    /**
     * Envia um email com a senha para o usuario
     * @param email
     * @param password
     */
    public void sendPasswordEmail (String email, String password) {
        try{
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        String htmlContent = String.format("""
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Bem-vindo ao FlyHigh</title>
            </head>
            <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4f4f4;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%%" style="max-width:600px; background-color:#ffffff; margin-top:20px; border-radius:8px; box-shadow:0 0 10px rgba(0,0,0,0.1);">
                <tr>
                    <td align="center" bgcolor="#1e90ff" style="padding: 20px 0; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                    <img src="" alt="FlyHigh Logo" width="100" style="display: block;" />
                    </td>
                </tr>
                <tr>
                    <td style="padding: 30px;">
                    <h2 style="color:#333333; margin-bottom: 20px;">Seja bem-vindo ao FlyHigh!</h2>
                    <p style="color:#555555; font-size:16px; line-height:1.5;">
                        Estamos felizes em ter você com a gente. Aqui está sua senha:
                    </p>
                    <table align="center" cellpadding="10" cellspacing="0" style="margin: 20px auto;">
                        <tr>
                        <td align="center" bgcolor="#1e90ff" style="color:#ffffff; font-size:20px; border-radius: 5px;">
                            <strong>%s</strong>
                        </td>
                        </tr>
                    </table>
                    <p style="color:#999999; font-size:14px; text-align:center; margin-top: 30px;">
                        Altere sua senha após o primeiro login para manter sua conta segura.
                    </p>
                    </td>
                </tr>
                <tr>
                    <td align="center" bgcolor="#f4f4f4" style="padding: 20px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                    <small style="color:#aaaaaa;">&copy; 2025 FlyHigh. Todos os direitos reservados.</small>
                    </td>
                </tr>
                </table>
            </body>
            </html>
            """, password);

        helper.setTo(email);
        helper.setSubject("Bem-vindo ao FlyHigh!");
        helper.setText(htmlContent, true);
        helper.setFrom("flyhy65@gmail.com");   

        mailSender.send(message);
        System.out.println("Email enviado para " + email + " com a senha: " + password);
        }catch (Exception e){
            System.out.println("Erro ao enviar email com senha: " + e.getMessage());
        }

    }

}
