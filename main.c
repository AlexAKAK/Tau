#include <stdio.h>
#include <stdlib.h>
#include <string.h>

enum actions {
    encrypt = 0,
    decrypt = 1
};


char * encrypt(char * s, unsigned int offset);
char * decrypt(char * s, unsigned int offset);

int main(void) {
    char * path = "message.txt";
    char * content = getContent(path);

    char * s = encrypt(content, 5);
    char * a = decrypt(s, 5);

    printf("%s\n", s);
    printf("%s\n", a);

    return EXIT_SUCCESS;
}

char * encrypt(char * s, unsigned int offset) {
    unsigned int i = 0;
    char * _s = malloc(sizeof(char) * 100000);
    for (i; i<strlen(s); i++) {
        char c = s[i];
        _s[i] = c + offset;
    }

    return _s;

}

char * decrypt(char * s, unsigned int offset) {
    unsigned int i = 0;
    char * _s = malloc(sizeof(char) * 100000);
    for (i; i<strlen(s); i++) {
        char c = s[i];
        _s[i] = c - offset;
    }

    return _s;

}

int getAction() {
    scanf()
}


