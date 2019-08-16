package com.karmen.noteit.api.viewmodel;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
public class NotebookViewModel {
    private String id;

    @NotNull
    private String name;

    private int numberOfNotes;
}
