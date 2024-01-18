package fr.loan.bibliotheque.Page;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdatePageDto {
    private String title;
    private String content;
    private Integer book;
}
