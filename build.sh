folder_path="./build"
env_name=".env"
argument="$1"

if [ "$argument" = "open" ]; then
    echo "[LOG] tipo: aberto(editavel)"
elif [ "$argument" = "zip" ]; then
    echo "[LOG] tipo: zipado(pronto para hospedagem rapida)"
else
    echo "[LOG/ERROR] tipo inválido. deve ser 'open' ou 'zip'."
    exit 1
fi

if [ -d "$folder_path" ]; then
    files=$(ls -1 "$folder_path")
    if [ $(echo "$files" | wc -l) -gt 0 ]; then
        echo "[LOG] existe arquivos na pasta, deletando arquivos..."
        rm -rf "$folder_path"/*
    fi
    echo "[LOG] criando build para $folder_path"
else
    mkdir -p "$folder_path"
    echo "[LOG] pasta $folder_path criada"
    echo "[LOG] criando build para $folder_path"
fi

echo "[LOG] copiando arquivos..."
cp -r ./src "$folder_path"
cp -r ./assets "$folder_path"

cp "./Cluster.js" "$folder_path"
cp "./package.json" "$folder_path"
cp "./private_files/karinatwo.env" "$folder_path"
mv "$folder_path/karinatwo.env" "$folder_path/$env_name"
echo "[LOG] arquivos copiados!"

if [ "$argument" = "open" ]; then
    echo ""
    echo "[LOG] build concluida!"
    exit 1
elif [ "$argument" = "zip" ]; then
    echo "[LOG] zipando conteudo..."
    zip -r "$folder_path/karinaTwo.zip" "$folder_path"
    echo "[LOG] limpando conteudo inutil..."
    rm -rf "$folder_path/Cluster.js"
    rm -rf "$folder_path/package.json"
    rm -rf "$folder_path/.env"
    rm -rf "$folder_path/src"
    rm -rf "$folder_path/assets"

    echo ""
    echo "[LOG] build concluida!"
    exit 1
fi
