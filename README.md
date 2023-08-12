### Hexlet tests and linter status:
[![Actions Status](https://github.com/IgorGram/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/IgorGram/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/b72693d4a34b34779ab2/maintainability)](https://codeclimate.com/github/IgorGram/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/b72693d4a34b34779ab2/test_coverage)](https://codeclimate.com/github/IgorGram/frontend-project-lvl2/test_coverage)

Описание проекта:

Вычислитель отличий – программа, определяющая разницу между двумя структурами данных. Подобный механизм используется при выводе тестов или при автоматическом отслеживании изменений в конфигурационных файлах.

Программа поддерживает работу с форматами yaml, yml, json.

Программа может работать как с командной строкой, так и быть установленной в качестве библиотеки в сторонний проект.

Отчет генерируется в форматах:
- _plain text_: вывод различий в текстовом формате;
- _stylish_: вывод различий в виде древовидной структуры;
- _json_: вывод различий в JSON формате.

Минимальные требования:

1. Наличие установленного терминала;
2. Наличие установленного Node.js



Инструкция по установке и запуск:

1. Установите пакеты, необходимые для работы программы, при помощи команды
   `npm install`, которая скачает их в папку проекта node_modules в соответствии с конфигурацией в файле package.json:

    ```
    $ npm install
    ```

2. Установите пакет в систему с помощью команды:

    ```
    $ npm link
    ```

3. Запустите генератор командой:

    ```
    $ gendiff  [наименование формата] <путь к файлу1> <путь к файлу2>
    ```

Пути могут быть как абсолютными, так и относительными.

Форматы задаются флагами ```-f```. Имена поддерживаемых форматов:
- stylish (установлен по умолчанию);
- plain;
- json.

Описание утилиты выводится командой:

 ```
    $ gendiff -h
```
[![asciicast](https://asciinema.org/a/dkwLurR0wbeTrGY30L9QfzYn0.svg)](https://asciinema.org/a/dkwLurR0wbeTrGY30L9QfzYn0)

Вывод в stylish формате:
 ```
    $ gendiff --format stylish __fixtures__/file1.json __fixtures__/file2.json
```
[![asciicast](https://asciinema.org/a/4Y19x1671x8BEJ1J22jOYLb5B.svg)](https://asciinema.org/a/4Y19x1671x8BEJ1J22jOYLb5B)
Вывод в plain формате:
 ```
    $ gendiff --format plain __fixtures__/file1.json __fixtures__/file2.json
```
[![asciicast](https://asciinema.org/a/ErtFqWw97EKIb7XSlgwpGmHdD.svg)](https://asciinema.org/a/ErtFqWw97EKIb7XSlgwpGmHdD)

Вывод в json формате:
 ```
    $ gendiff --format json __fixtures__/file1.json __fixtures__/file2.json
```
[![asciicast](https://asciinema.org/a/Plf0NgANdfE2xc0Z7siS0cmh4.svg)](https://asciinema.org/a/Plf0NgANdfE2xc0Z7siS0cmh4)
