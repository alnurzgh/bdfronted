$books = @(
    @{folder="Ведьмак. Крещение огнем"; file="ведьмак-крещение-огнем.html"; price=7200; rating=4.7},
    @{folder="Hunter X Hunter, Vol. 9"; file="hunter-x-hunter-vol-9.html"; price=4500; rating=5.0},
    @{folder="Бегущий в лабиринте"; file="бегущий-в-лабиринте.html"; price=8900; rating=4.7},
    @{folder="Божественная комедия"; file="божественная-комедия.html"; price=11500; rating=4.0},
    @{folder="Дневники вампира. Пробуждение"; file="дневники-вампира-пробуждение.html"; price=7800; rating=4.0},
    @{folder="Земля"; file="земля.html"; price=9200; rating=4.0},
    @{folder="Invincible Vol 23 Full House"; file="invincible-vol-23.html"; price=5800; rating=5.0},
    @{folder="Магическая битва Том 28"; file="магическая-битва-том-28.html"; price=4200; rating=4.7},
    @{folder="Незнакомка из Уайлдфелл-Холла"; file="незнакомка-из-уайлдфелл-холла.html"; price=10200; rating=4.0},
    @{folder="Непобедимый Том 1 Семейные дела"; file="непобедимый-том-1.html"; price=5200; rating=4.7},
    @{folder="Непобедимый том 12 Всё ещё стоим"; file="непобедимый-том-12.html"; price=5500; rating=5.0},
    @{folder="Сага о Форсайтах"; file="сага-о-форсайтах.html"; price=11800; rating=4.0},
    @{folder="Спеши любить"; file="спеши-любить.html"; price=6800; rating=4.7},
    @{folder="Таинственный сад"; file="таинственный-сад.html"; price=7500; rating=4.5},
    @{folder="Убийство на поле для гольфа"; file="убийство-на-поле-для-гольфа.html"; price=8200; rating=4.5},
    @{folder="Убить пересменщика"; file="убить-пересменщика.html"; price=9800; rating=4.0},
    @{folder="Человек-бензопила том 4 Оружие могущественнее"; file="человек-бензопила-том-4.html"; price=4800; rating=4.7}
)

Write-Output "Starting to generate $($books.Count) product pages..."
foreach ($book in $books) {
    Write-Output "Creating: $($book.file)"
}
Write-Output "Script ready to execute"
