package com.ms.flight.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class BlobStorageService {

    private final Map<String, BlobFile> blobStorage = new HashMap<>();

    /**
     * Realiza o upload do arquivo recebido em MultipartFile, armazenando como Blob em memória.
     * @param file arquivo a ser armazenado
     * @return ID único gerado para o arquivo
     * @throws IOException em caso de falha na leitura do arquivo
     */
    public String uploadFile(MultipartFile file) throws IOException {
        validateFile(file);

        String id = UUID.randomUUID().toString();
        BlobFile blobFile = new BlobFile(file.getOriginalFilename(), file.getContentType(), file.getBytes());

        blobStorage.put(id, blobFile);
        return id;
    }

    /**
     * Remove o arquivo Blob associado ao ID informado.
     * @param id identificador único do arquivo
     * @return true se a remoção foi bem-sucedida, false caso o arquivo não exista
     */
    public boolean deleteFile(String id) {
        if (blobStorage.containsKey(id)) {
            blobStorage.remove(id);
            return true;
        }
        return false;
    }

    /**
     * Recupera o arquivo Blob armazenado para posterior processamento ou download.
     * @param id identificador do arquivo
     * @return BlobFile contendo dados do arquivo ou null se não encontrado
     */
    public BlobFile getFile(String id) {
        return blobStorage.get(id);
    }

    /**
     * Validação básica do arquivo recebido.
     * @param file MultipartFile a validar
     */
    private void validateFile(MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Arquivo vazio não pode ser processado.");
        }
        if (file.getSize() > 10 * 1024 * 1024) { // Limite arbitrário: 10MB
            throw new IllegalArgumentException("Arquivo excede o tamanho máximo permitido de 10MB.");
        }
        // Poderia ser adicionado validação de tipos MIME permitidos aqui
    }

    /**
     * Classe interna para encapsular os dados do arquivo em Blob.
     */
    public static class BlobFile {
        private final String fileName;
        private final String contentType;
        private final byte[] data;

        public BlobFile(String fileName, String contentType, byte[] data) {
            this.fileName = fileName;
            this.contentType = contentType;
            this.data = data;
        }

        public String getFileName() {
            return fileName;
        }

        public String getContentType() {
            return contentType;
        }

        public byte[] getData() {
            return data;
        }
    }
}
