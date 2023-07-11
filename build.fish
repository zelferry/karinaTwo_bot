set folder_path "./build"
set env_name ".env"
set argument $argv[1]

if test "$argument" = "open" 
    echo "[LOG] tipo: aberto(editavel)"
else if test "$argument" = "zip"
    echo "[LOG] tipo: zipado(pronto para hospedagem rapida)"
else
    echo "[LOG/ERROR] tipo inválido. deve ser 'open' ou 'zip'."
    exit 1
end

if test -d $folder_path
    set files (ls -1 $folder_path)
    if count $files > 0
        echo "[LOG] existe arquivos na pasta, deletando arquivos..."
        rm -rf $folder_path/*
    end

    echo "[LOG] criando build para $folder_path"
else
    mkdir -p $folder_path
    echo "[LOG] pasta $folder_path criada"
    echo "[LOG] criando build para $folder_path"
end


echo "[LOG] copiando arquivos..."
cp -r ./src $folder_path
cp -r ./assets $folder_path

cp "./Cluster.js" $folder_path
cp "./package.json" $folder_path
cp "./private_files/karinatwo.env" $folder_path
mv "$folder_path/karinatwo.env" "$folder_path/$env_name"
echo "[LOG] arquivos copiados!"

if test "$argument" = "open" 
    echo ""
    echo "[LOG] build concluida!"
    exit 1
else if test "$argument" = "zip"
    echo "[LOG] zipando conteudo..."
    zip -r "$folder_path/karinaTwo.zip" $folder_path
    echo "[LOG] limpando conteudo inutil..."
    rm -rf "$folder_path/Cluster.js"
    rm -rf "$folder_path/package.json"
    rm -rf "$folder_path/.env"
    rm -rf "$folder_path/src"
    rm -rf "$folder_path/assets"

    echo ""
    echo "[LOG] build concluida!"
    exit 1
end