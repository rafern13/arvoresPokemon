package main

import (
	"fmt"
	"os"
	"bufio"
	"strings"
	"strconv"
	"encoding/json"
)

type Pokemon struct {
	Nome string
	Hp int
	Atk int
	Def int
}

var pokemons []Pokemon

func main() {
	lerArquivo()
}

func lerArquivo() {
	arq1, err := os.Open("../../public/pokemons.txt")

	if err != nil {
		panic(err)
		fmt.Println("OI")
		return
	}

	defer arq1.Close()

	scanner := bufio.NewScanner(arq1)

	registro := ""
	contador := 0
	for scanner.Scan() {
		registro = scanner.Text()
		
		if contador == 0 {
			contador++
			continue
		}

		if registro == "" {
			continue
		}

		split := strings.Split(registro, " ")
		tamanho := len(split)

		nome := strings.Join(split[:tamanho-3], " ")
		hp, _ := strconv.Atoi(split[tamanho-3])
		atk, _ := strconv.Atoi(split[tamanho-2])
		def, _ := strconv.Atoi(split[tamanho-1])
		pokemon := Pokemon{nome, hp, atk, def}
		pokemons = append(pokemons, pokemon)
		contador++
	}		

	escreverArquivo()
}

func escreverArquivo() {
	arq2, err := os.Create("./pokemons.json")

	if err != nil {
		fmt.Println("oioio", err)
		return
	}

	defer arq2.Close()

	jsonData, err := json.MarshalIndent(pokemons, "", "  ")
	if err != nil {
		fmt.Println("Erro ao converter para JSON:", err)
		return
	}

	arq2.Write(jsonData)
}
