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
	arq1, err := os.Open("/pokemons.txt")

	if err != nil {
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

		nome := split[0]
		hp, _ := strconv.Atoi(split[1])
		atk, _ := strconv.Atoi(split[2])
		def, _ := strconv.Atoi(split[3])
		pokemon := Pokemon{nome, hp, atk, def}
		pokemons = append(pokemons, pokemon)
		contador++
	}		

	escreverArquivo()
}

func escreverArquivo() {
	arq2, err := os.Create("/pokemons.json")

	if err != nil {
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
