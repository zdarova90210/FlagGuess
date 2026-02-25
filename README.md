# FlagGuess

Скрипт генерации стран сейчас создаёт только эти поля: `code`, `name`, `nameRu`, `flagSvgPath`, `flagPngPath`.

Поля `difficulty` и `similarFlags` добавлены отдельно с помощью AI в [countries.generated.json](src/app/assets/data/countries.generated.json).

Важно: при повторном запуске `npm generate.countries` файл будет пересоздан без `difficulty` и `similarFlags`.
