#include <stdio.h>
#include <windows.h>

int main(void) {
    system("cls");
    printf("\033[0;32m");
    printf("%s", "[Compiling Project]\n");
    system("tsc --outdir out");
    printf("%s", "[Executing index.js]\n");
    
    while(1) {
        system("node out/index.js");
    }

    return 0;
}