let furnituresDB = [
    // Arcos
    {
        name: "Arco 3D",
        type: "arcos",
        measures: "180x100",
        price: 250.00,
        img: "/arcos/arco3d.png"
    },
    {
        name: "Arco Casa",
        type: "arcos",
        measures: "220x200",
        price: 290.00,
        img: "/arcos/arco_casa.png"
    },
    {
        name: "Arco en tres medidas",
        type: "arcos",
        measures: "155x100 / 138x68 / 123x36",
        price: 225.00,
        img: "/arcos/arco_hexagonal.png"
    },
    {
        name: "Arco Hexagonal",
        type: "arcos",
        measures: "200x200 / Listones: 120x9 / Patines: 1m",
        comment: "Madera, 6 listones",
        price: 210.00,
        img: "/arcos/arco_hexagonal.png"
    },
    {
        name: "Arco Recto",
        type: "arcos",
        measures: "225x220",
        price: 140.00,
        img: "/arcos/arco_recto.png"
    },
    {
        name: "Arco Triangular Plegable",
        type: "arcos",
        measures: "225x143",
        comment: "Madera, Individual",
        price: 200.00,
        img: "/arcos/arco_plegable.png"
    },
    {
        name: "Arcos Triangulares Plegables",
        type: "arcos",
        measures: "225x143 / 175x110",
        comment: "Madera, Dúo",
        price: 390.00,
        img: "/arcos/arco_triangular_plegable.png"
    },
    {
        name: "Marcos con patas",
        type: "arcos",
        measures: "170x60",
        comment: "Dúo",
        price: 80.00,
        img: "/arcos/marcos_con_patas.png"
    },
    {
        name: "Arco Recto 3D",
        type: "arcos",
        measures: "200x140",
        comment: "Desmontable",
        price: 225.00,
        img: "/arcos/arco_recto_3d.png"
    },
    {
        name: "Arco Romano",
        type: "arcos",
        measures: "200x140",
        price: 275.00,
        img: "/arcos/arco_romano.png"
    },
    {
        name: "Marco Rejilla Seating",
        type: "arcos",
        measures: "160x80",
        comment: "Madera",
        price: 70.00,
        img: "/arcos/marco_rejilla_seating.png"
    },

    // Bandejas
    {
        name: "Bandeja Básica",
        type: "bandejas",
        measures: "20x30",
        comment: "Sin pintar",
        price: 8.50,
        img: "/bandejas/bandeja_basica.png"
    },
    {
        name: "Bandeja Deisy",
        type: "bandejas",
        measures: "15x20",
        price: 25.00,
        img: "/bandejas/bandeja_deisy.png"
    },
    {
        name: "Bandeja Deisy",
        type: "bandejas",
        measures: "20x30",
        price: 30.00,
        img: "/bandejas/bandeja_deisy_big.png"
    },
    {
        name: "Bandeja Piolín",
        type: "bandejas",
        measures: "20x30",
        price: 22.00,
        img: "/bandejas/bandeja_piolin.png"
    },
    {
        name: "Bandeja Pluto",
        type: "bandejas",
        measures: "20x30",
        price: 22.00,
        img: "/bandejas/bandeja_pluto.png"
    },
    {
        name: "Bandeja Pluto",
        type: "bandejas",
        measures: "25x35",
        price: 29.00,
        img: "/bandejas/bandeja_pluto_big.png"
    },

    // Bases

    {
        name: "Base de Tarta sin Pie",
        type: "bases",
        measures: "Diámetro 24 o 30",
        price: 10.00,
        img: "/bases/base_tarta_sin_pie.png"
    },
    {
        name: "Base de Tarta con Pie",
        type: "bases",
        measures: "22x30 o 20x24",
        comment: "Rectangulares o redondas",
        price: 30.00,
        img: "/bases/base_tarta_con_pie.png"
    },
    {
        name: "Bases Nórdicas (Pack 4)",
        type: "bases",
        price: 150.00,
        img: "/bases/bases_nordicas.png"
    },
    {
        name: "Bases arco (Pack 4)",
        type: "bases",
        measures: "27x25x15 / 25x20x9.5 / 24x21x12 / 20x17x9",
        price: 135.00,
        img: "/bases/bases_nordicas.png"
    },
    
    // Carros
    {
        name: "Carreta (4 ruedas)",
        type: "carros",
        measures: "150x70",
        comment: "Madera y DM",
        price: 280.00,
        img: "/carros/carreta_4_ruedas.png"
    },
    {
        name: "Carrito Camarera",
        type: "carros",
        measures: "25x35",
        price: 100.00,
        img: "/carros/camarera.png"
    },
    {
        name: "Carrito Candy",
        type: "carros",
        measures: "190x80x50",
        comment: "2 mastiles",
        price: 285.00,
        img: "/carros/carrito_candy_2_mastiles.png"
    },
    {
        name: "Carrito Candy",
        type: "carros",
        measures: "220x90x60",
        comment: "4 mastiles",
        price: 390.00,
        img: "/carros/carrito_candy_4_mastiles.png"
    },
    {
        name: "Carrito Candy",
        type: "carros",
        measures: "210x100x50",
        comment: "4 mastiles",
        price: 450.00,
        img: "/carros/carrito_candy_4_mastiles_cajon_alto.png"
    },
    
    // Cubos
    {
        name: "Cubo Mixto Perforado",
        type: "cubos",
        measures: "50x40x40",
        comment: "Perforado",
        price: 85.00,
        img: "/cubos/cubo_mixto_perforado.png"
    },
    {
        name: "Cubo Mixto Rayado",
        type: "cubos",
        measures: "60x50x50",
        comment: "Rayado",
        price: 100.00,
        img: "/cubos/cubo_mixto_rayado.png"
    },
    {
        name: "Cubos Zeta",
        type: "cubos",
        measures: "80x40 / 70x30",
        comment: "2 alturas",
        price: 185.00,
        img: "/cubos/cubos_zeta.png"
    },

    {
        name: "Cubo Cerrado",
        type: "cubos",
        measures: "80x40x40",
        comment: "Individual",
        price: 95.00,
        img: "/cubos/cubo_cerrado.png"
    },
    {
        name: "Cubos Cerrados tunel",
        type: "cubos",
        measures: "80x35x35 / 50x40x40",
        comment: "Dúo",
        price: 200.00,
        img: "/cubos/cubos_cerrados_tunel.png"
    },
    {
        name: "Cubos Cerrados",
        type: "cubos",
        measures: "80x35x35 / 90x30x30 / 70x35x35",
        comment: "Pack de 3",
        price: 280.00,
        img: "/cubos/cubos_cerrados(pack3).png"
    },
    {
        name: "Cubos Cerrados",
        type: "cubos",
        measures: "80x30x30 (x2) / 50x40x40 (x2)",
        comment: "Pack de 4",
        price: 295.00,
        img: "/cubos/cubos_cerrados(pack4).png"
    },
    {
        name: "Peldaño para cubo",
        type: "cubos",
        measures: "50x45x30",
        price: 45.00,
        img: "/cubos/peldaño_para_cubo.png"
    },
    {
        name: "Cubo Plegable",
        type: "cubos",
        measures: "80x50x45",
        comment: "Sin peldaño",
        price: 120.00,
        img: "/cubos/cubo_plegable_sin_peldaño.png"
    },
    {
        name: "Cubo Plegable",
        type: "cubos",
        measures: "Cubo: 80x50x45 / Peldaño: 50x45x30",
        comment: "Con peldaño",
        price: 160.00,
        img: "/cubos/cubo_plegable_con_peldaño.png"
    },
    {
        name: "Cubo Plegable",
        type: "cubos",
        measures: "70x35x35",
        comment: "Individual",
        price: 75.00,
        img: "/cubos/cubo_plegable_individual.png"
    },
    {
        name: "Cubo Plegable",
        type: "cubos",
        measures: "80x35x35",
        comment: "Individual",
        price: 90.00,
        img: "/cubos/cubo_plegable_big.png"
    },
    {
        name: "Cubo Plegable",
        type: "cubos",
        measures: "90x35x35",
        comment: "Individual",
        price: 105.00,
        img: "/cubos/cubo_plegable_biggest.png"
    },
    {
        name: "Cubos Plegables",
        type: "cubos",
        measures: "90x35x35",
        comment: "Pack de 3",
        price: 255.00,
        img: "/cubos/cubos_plegables(pack3).png"
    },
    {
        name: "Cubos Plegables",
        type: "cubos",
        measures: "80,70,60x35x35",
        comment: "Madera listones",
        price: 330.00,
        img: "/cubos/cubos_plegables_listones.png"
    },
    {
        name: "Cubos Plegables",
        type: "cubos",
        measures: "70x40x40 / 60x35x35 / 50x35x35",
        comment: "Pack de 3, con rejilla",
        price: 390.00,
        img: "/cubos/cubos_plegables(pack3).png"
    },
    {
        name: "Cubos huecos",
        type: "cubos",
        measures: "80x30x30 / 50x40x40",
        comment: "Dúo",
        price: 120.00,
        img: "/cubos/cubos_huecos(pack2).png"
    },
    {
        name: "Cubos huecos",
        type: "cubos",
        measures: "80x30 (x2) / 50x40 (x2)",
        comment: "Pack de 4",
        price: 220.00,
        img: "/cubos/cubos_huecos(pack4).png"
    },
    {
        name: "Cubos esquineros",
        type: "cubos",
        measures: "80x40x40 / 70x40x40",
        comment: "Dúo",
        price: 195.00,
        img: "/cubos/cubos_esquineros(pack2).png"
    },
    {
        name: "Cubo plegable túnel",
        type: "cubos",
        measures: "70x45x45",
        price: 120.00,
        img: "/cubos/cubo_plegable_tunel.png"
    },
    {
        name: "Cubos plegables túnel",
        type: "cubos",
        measures: "70x45x45 (x2)",
        comment: "Dúo",
        price: 220.00,
        img: "/cubos/cubo_plegable_tunel(pack2).png"
    },

    // Cilindros

    {
        name: "Cilindro Style",
        type: "cilindros",
        measures: "80x40 / 70x40 / 60x35",
        comment: "Pack de 3",
        price: 375.00,
        img: "/cilindros/cilindro_style.png"
    },
    {
        name: "Cilindros Cerrados",
        type: "cilindros",
        measures: "85x55 / 70x45 / 55x35",
        comment: "Pack de 3",
        price: 265.00,
        img: "/cilindros/cilindros_cerrados.png"
    },
    {
        name: "Cilindros Huecos",
        type: "cilindros",
        measures: "85x55 / 70x45 / 55x35",
        comment: "Pack de 3",
        price: 205.00,
        img: "/cilindros/cilindros_huecos.png"
    },

    // Escaleras
    {
        name: "Escalera 2 Baldas",
        type: "escaleras",
        measures: "100x70",
        price: 100.00,
        img: "/escaleras/escalera_2_baldas.png"
    },
    {
        name: "Escalera 3 Baldas",
        type: "escaleras",
        measures: "100x70",
        price: 135.00,
        img: "/escaleras/escalera_3_baldas.png"
    },
    {
        name: "Escalera 4 Baldas",
        type: "escaleras",
        measures: "160x120",
        price: 160.00,
        img: "/escaleras/escalera_4_baldas.png"
    },
    {
        name: "Escalera 5 Baldas",
        type: "escaleras",
        measures: "160x120",
        price: 170.00,
        img: "/escaleras/escalera_5_baldas.png"
    },

    // Letras y números

    {
        name: "Letra o número",
        type: "letras/numeros",
        measures: "1m de alto",
        comment: "DM, sin luz",
        price: 105.00,
        img: "/letra_o_numero/letra_o_numero_sin_luz.png"
    },
    {
        name: "Letra o número",
        type: "letras/numeros",
        measures: "1m de alto",
        comment: "DM, con luz",
        price: 130.00,
        img: "/letra_o_numero/letra_o_numero_con_luz.png"
    },
    {
        name: "Letra o número",
        type: "letras/numeros",
        measures: "1m de alto",
        comment: "Madera, sin luz",
        price: 125.00,
        img: "/letra_o_numero/letra_o_numero_madera_sin_luz.png"
    },
    {
        name: "Letra o número",
        type: "letras/numeros",
        measures: "1m de alto",
        comment: "Madera, con luz",
        price: 140.00,
        img: "/letra_o_numero/letra_o_numero_madera_con_luz.png"
    },
    {
        name: "Ampersand (&)",
        type: "letras/numeros",
        measures: "75cm de alto",
        comment: "Madera, con luz",
        price: 100.00,
        img: "/letra_o_numero/ampersand.png"
    },
    {
        name: "Cruz con luces",
        type: "letras/numeros",
        measures: "1m de alto",
        comment: "DM, con luz",
        price: 130.00,
        img: "/letra_o_numero/cruz_con_luces.png"
    },
    {
        name: "Letra LOVE",
        type: "letras/numeros",
        measures: "1m de alto",
        comment: "Madera, con luz",
        price: 500.00,
        img: "/letra_o_numero/love.png"
    },
    {
        name: "Número 75cm",
        type: "letras/numeros",
        measures: "75x45",
        comment: "Sencillo y desmontable",
        price: 55.00,
        img: "/letra_o_numero/love.png"
    },
    {
        name: "Número 5 3D",
        type: "letras/numeros",
        measures: "70x50x40",
        price: 175.00,
        img: "/letra_o_numero/numero_5_3d.png"
    },

    // Mesas

    {
        name: "Mesa Bomber",
        type: "mesas",
        measures: "90x100x50",
        price: 195.00,
        img: "/mesas/mesa_bomber.png"
    },
    {
        name: "Mesa Candy",
        type: "mesas",
        measures: "75x100x50",
        comment: "Dos alturas",
        price: 225.00,
        img: "/mesas/mesa_candy.png"
    },
    {
        name: "Mesa Luis XV",
        type: "mesas",
        measures: "50x40x40",
        comment: "Pequeña",
        price: 60.00,
        img: "/mesas/mesa_luisXV_small.png"
    },
    {
        name: "Mesa Luis XV",
        type: "mesas",
        measures: "160x60",
        comment: "Grande",
        price: 240.00,
        img: "/mesas/mesa_luisXV_big.png"
    },
    {
        name: "Mesa Party",
        type: "mesas",
        measures: "70x100x50",
        comment: "Pequeña",
        price: 160.00,
        img: "/mesas/mesa_party_small.png"
    },
    {
        name: "Mesa Party",
        type: "mesas",
        measures: "80x100x50",
        comment: "Mediana",
        price: 180.00,
        img: "/mesas/mesa_party_medium.png"
    },
    {
        name: "Mesa Party",
        type: "mesas",
        measures: "80x100x50",
        comment: "Grande",
        price: 195.00,
        img: "/mesas/mesa_party_big.png"
    },
    {
        name: "Mesa Party Lisa",
        type: "mesas",
        measures: "80x100x50",
        comment: "Lisa",
        price: 195.00,
        img: "/mesas/mesa_party_lisa.png"
    },
    {
        name: "Mesa Picnic",
        type: "mesas",
        measures: "80x120x30",
        price: 225.00,
        img: "/mesas/mesa_picnic.png"
    },
    {
        name: "Mesa Plegable",
        type: "mesas",
        measures: "150x80x50",
        price: 275.00,
        img: "/mesas/mesa_plegable.png"
    },
    {
        name: "Mesa Zig-Zag",
        type: "mesas",
        measures: "100x90x50",
        comment: "Un color",
        price: 215.00,
        img: "/mesas/mesa_zig-zag_1_color.png"
    },
    {
        name: "Mesa Zig-Zag",
        type: "mesas",
        measures: "100x90x50",
        comment: "Dos colores",
        price: 235.00,
        img: "/mesas/mesa_zig-zag_2_colors.png"
    },
    {
        name: "Mesa Caballetes",
        type: "mesas",
        measures: "120x60",
        comment: "Pequeña",
        price: 150.00,
        img: "/mesas/mesa_caballetes_small.png"
    },
    {
        name: "Mesa Caballetes",
        type: "mesas",
        measures: "160x60",
        comment: "Grande",
        price: 190.00,
        img: "/mesas/mesa_caballetes_big.png"
    },
    {
        name: "Mesa Cónicas",
        type: "mesas",
        measures: "70x40 / 60x40",
        comment: "Dúo",
        price: 200.00,
        img: "/mesas/mesas_conicas.png"
    },
    {
        name: "Mesa Tocinera",
        type: "mesas",
        measures: "100x40x80",
        comment: "Mesa pintada",
        price: 160.00,
        img: "/mesas/mesas_conicas.png"
    },
    {
        name: "Mesa rallada",
        type: "mesas",
        measures: "90x50x35",
        comment: "Pequeña",
        price: 120.00,
        img: "/mesas/mesas_rallada_pequeña.png"
    },
    {
        name: "Mesa rallada",
        type: "mesas",
        measures: "90x100x50",
        comment: "Grande",
        price: 195.00,
        img: "/mesas/mesas_rallada_grande.png"
    },

    // Paneles
    
    {
        name: "Panel Alacena 3D",
        type: "paneles",
        measures: "180x100",
        comment: "3 baldas en dos piezas",
        price: 350.00,
        img: "/paneles/panel_alacena_3d.png"
    },
    {
        name: "Panel Arco Hueco",
        type: "paneles",
        measures: "180x100",
        comment: "Pintado",
        price: 190.00,
        img: "/paneles/panel_arco_hueco.png"
    },
    {
        name: "Panel Arco Hueco",
        type: "paneles",
        measures: "170x100",
        comment: "3 piezas",
        price: 180.00,
        img: "/paneles/panel_arco_hueco_3_piezas.png"
    },
    {
        name: "Panel Arcoiris",
        type: "paneles",
        measures: "155x100",
        price: 175.00,
        img: "/paneles/panel_arcoiris.png"
    },
    {
        name: "Panel Baldas",
        type: "paneles",
        measures: "180x100",
        price: 185.00,
        img: "/paneles/panel_baldas_big.png"
    },
    {
        name: "Panel Baldas",
        type: "paneles",
        measures: "180x80",
        price: 170.00,
        img: "/paneles/panel_baldas_small.png"
    },
    {
        name: "Panel Baldas",
        type: "paneles",
        measures: "165x60",
        comment: "Dúo",
        price: 255.00,
        img: "/paneles/panel_baldas_(pack2).png"
    },
    {
        name: "Panel Baldas para Copas",
        type: "paneles",
        measures: "180x80",
        comment: "5 baldas",
        price: 195.00,
        img: "/paneles/panel_baldas_para_copas.png"
    },
    {
        name: "Panel Chuches (8)",
        type: "paneles",
        measures: "190x80",
        price: 295.00,
        img: "/paneles/panel_chuches(8).png"
    },
    {
        name: "Panel Chuches (12)",
        type: "paneles",
        measures: "200x120",
        comment: "Hueco para Neón (no incluido)",
        price: 350.00,
        img: "/paneles/panel_chuches(12).png"
    },
    {
        name: "Panel Circular",
        type: "paneles",
        measures: "115 o 100 diámetro",
        price: 125.00,
        img: "/paneles/panel_circular.png"
    },
    {
        name: "Panel Espejos",
        type: "paneles",
        measures: "1x1",
        comment: "Madera, sin espejos",
        price: 130.00,
        img: "/paneles/panel_espejos.png"
    },
    {
        name: "Panel Hueco",
        type: "paneles",
        measures: "170x100",
        comment: "Tres piezas",
        price: 180.00,
        img: "/paneles/panel_hueco.png"
    },
    {
        name: "Paneles lisos",
        type: "paneles",
        measures: "180x60 / 150x60",
        comment: "Dúo",
        price: 195.00,
        img: "/paneles/paneles_lisos(pack2).png"
    },
    {
        name: "Panel liso",
        type: "paneles",
        measures: "180x100",
        price: 160.00,
        img: "/paneles/panel_liso_small.png"
    },
    {
        name: "Panel liso",
        type: "paneles",
        measures: "200x100",
        price: 165.00,
        img: "/paneles/panel_liso_big.png"
    },
    {
        name: "Panel liso arco",
        type: "paneles",
        measures: "180x80",
        price: 155.00,
        img: "/paneles/panel_liso_arco.png"
    },
    {
        name: "Paneles láminas",
        type: "paneles",
        measures: "180x80",
        comment: "Plegable",
        price: 190.00,
        img: "/paneles/paneles_laminas.png"
    },
    {
        name: "Panel Pino Baldas",
        type: "paneles",
        measures: "180x60 (x2)",
        comment: "Dúo",
        price: 230.00,
        img: "/paneles/panel_pino_baldas(pack2).png"
    },
    {
        name: "Panel sin pintar",
        type: "paneles",
        measures: "150x80 / 140x80",
        price: 175.00,
        img: "/paneles/panel_sin_pintar.png"
    },
    {
        name: "Panel ventana en arco",
        type: "paneles",
        measures: "143x79",
        price: 150.00,
        img: "/paneles/panel_ventana_arco.png"
    },
    {
        name: "Panel Fantasy",
        type: "paneles",
        measures: "180x60 / 150x60 / 120x60",
        comment: "Pack de 3",
        price: 265.00,
        img: "/paneles/panel_fantasy(pack3).png"
    },
    {
        name: "Panel Floral",
        type: "paneles",
        measures: "155x60",
        price: 180.00,
        img: "/paneles/panel_floral.png"
    },
    {
        name: "Panel Donuts",
        type: "paneles",
        measures: "160x60",
        price: 190.00,
        img: "/paneles/panel_donuts.png"
    },
    {
        name: "Panel Castillo 3 Piezas",
        type: "paneles",
        measures: "Pieza central: 2x1 / 2 piezas: 2.05x90",
        comment: "3 colores",
        price: 500.00,
        img: "/paneles/panel_castillo_3_piezas.png"
    },    

    // Varios

    {
        name: "Árbol de Navidad",
        type: "varios",
        measures: "72x42",
        comment: "DM, 3 Baldas",
        price: 250.00,
        img: "/varios/arbol_navidad.png"
    },
    {
        name: "Barra Mini",
        type: "varios",
        measures: "50x60x30",
        price: 100.00,
        img: "/varios/barra_mini.png"
    },
    {
        name: "Barra Pallets Grande",
        type: "varios",
        measures: "120x90",
        comment: "Madera",
        price: 190.00,
        img: "/varios/barra_pallets_grande.png"
    },
    {
        name: "Caja Barbie",
        type: "varios",
        measures: "155x80x60",
        price: 350.00,
        img: "/varios/caja_barbie.png"
    },
    {
        name: "Cajón Regalero",
        type: "varios",
        measures: "60x60x60",
        price: 75.00,
        img: "/varios/cajon_regalero.png"
    },
    {
        name: "Cajón Regalero Corazón",
        type: "varios",
        measures: "60x60x60",
        comment: "Desmontable",
        price: 75.00,
        img: "/varios/cajon_regalero_corazon.png"
    },
    {
        name: "Cartel Bienvenida",
        type: "varios",
        measures: "20x60x10",
        comment: "Con macetero, Contrachapado",
        price: 75.00,
        img: "/varios/cartel_bienvenida.png"
    },
    {
        name: "Donera (9 uds)",
        type: "varios",
        measures: "50x40",
        price: 40.00,
        img: "/varios/donera(9).png"
    },
    {
        name: "Donera recta (24 uds)",
        type: "varios",
        measures: "60x80",
        price: 80.00,
        img: "/varios/donera(24).png"
    },
    {
        name: "Mariposa",
        type: "varios",
        measures: "100x60 (cada ala) / 100x120 (ambas)",
        comment: "DM",
        price: 180.00,
        img: "/varios/mariposa.png"
    },
    {
        name: "Luna",
        type: "varios",
        measures: "180 alto",
        comment: "DM, dos piezas",
        price: 175.00,
        img: "/varios/luna.png"
    },
    {
        name: "Mini Banco",
        type: "varios",
        measures: "60x60",
        price: 90.00,
        img: "/varios/mini_banco.png"
    },
    {
        name: "Nube",
        type: "varios",
        measures: "5mm",
        comment: "DM",
        price: 30.00,
        img: "/varios/nube.png"
    },
    {
        name: "Piruletero",
        type: "varios",
        measures: "35x18",
        price: 35.00,
        img: "/varios/piruletero.png"
    },
    {
        name: "Pódium Cuadrado",
        type: "varios",
        measures: "80x80x15",
        comment: "Sin pintar",
        price: 90.00,
        img: "/varios/podium_cuadrado.png"
    },
    {
        name: "Pódium Redondo",
        type: "varios",
        measures: "90x45",
        comment: "Una pieza",
        price: 130.00,
        img: "/varios/podium_redondo.png"
    },
    {
        name: "Pódium Redondo",
        type: "varios",
        measures: "80x80x15 (cada pieza)",
        comment: "Dos piezas",
        price: 210.00,
        img: "/varios/podium_redondo_2_piezas.png"
    },
    {
        name: "Pódium Rectangular",
        type: "varios",
        measures: "60x50",
        comment: "Con luz",
        price: 90.00,
        img: "/varios/podium_rectangular.png"
    },
    {
        name: "Pódium Doble",
        type: "varios",
        measures: "120x50 (total) / 60x50 (cada mitad)",
        price: 140.00,
        img: "/varios/podium_doble.png"
    },
    {
        name: "Pódium Individual",
        type: "varios",
        measures: "60x50",
        price: 75.00,
        img: "/varios/podium_individual.png"
    },
    {
        name: "Pódium con luz",
        type: "varios",
        measures: "100x100",
        comment: "Individual / Sin pintar",
        price: 120.00,
        img: "/varios/podium_con_luz_sin_pintar.png"
    },
    {
        name: "Seating plan",
        type: "varios",
        comment: "Madera, Rectangular con luces",
        price: 120.00,
        img: "/varios/seating_plan.png"
    },
    {
        name: "Tipi",
        type: "varios",
        measures: "100x100",
        price: 140.00,
        img: "/varios/tipi.png"
    },
    {
        name: "Tocador",
        type: "varios",
        measures: "80x40x132",
        comment: "Sin espejo",
        price: 170.00,
        img: "/varios/tocador.png"
    },
    {
        name: "Trineo Pequeño",
        type: "varios",
        measures: "55x26x17",
        price: 40.00,
        img: "/varios/trineo_pequeño.png"
    },
    {
        name: "Trineo Grande",
        type: "varios",
        measures: "93x40x23",
        price: 70.00,
        img: "/varios/trineo_grande.png"
    },
    {
        name: "Tótem 5 señales",
        type: "varios",
        measures: "170cm",
        price: 80.00,
        img: "/varios/totem_5_senales.png"
    },
    {
        name: "Estrella 3D",
        type: "varios",
        measures: "70x70x25",
        price: 175.00,
        img: "/varios/estrella_3d.png"
    }    
];

module.exports = furnituresDB;