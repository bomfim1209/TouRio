import { Component, OnInit } from '@angular/core';
import { DadosService } from '../services/dados.service';

@Component({
  selector: 'app-ver-mais',
  templateUrl: './ver-mais.page.html',
  styleUrls: ['./ver-mais.page.scss'],
})
export class VerMaisPage implements OnInit {

  cardSelecionado: any;
  detalhes: any;

  constructor(private verMaisService: DadosService) {}

  ngOnInit() {
    // Obtém o cartão selecionado do serviço
    this.cardSelecionado = this.verMaisService.getCardSelecionado();

    if (!this.cardSelecionado) {
      console.error('Nenhum cartão foi selecionado.');
      return;
    }

    // Associa os detalhes ao cardSelecionado pelo id
    this.detalhes = this.todosDetalhes.find(
      detalhe => detalhe.id === this.cardSelecionado.id
    );

    if (!this.detalhes) {
      console.error('Nenhum detalhe encontrado para o cartão selecionado.');
    }
  }

  // Lista completa de detalhes dos cartões
  todosDetalhes = [
    {
      id: 1,
      icone: 'sunny-outline',
      frase: 'Ideal para dia de sol.',
      descricao1: 'O Cristo Redentor é um dos ícones mais reconhecidos do Brasil e uma das Novas Sete Maravilhas do Mundo Moderno.',
      descricao2: 'Localizado no alto do Corcovado, a 710 metros de altitude, o monumento oferece uma vista espetacular da cidade do Rio de Janeiro, com panorâmicas da Baía de Guanabara, do Pão de Açúcar, das praias e do centro urbano.',
      descricao3: 'É um símbolo de fé e acolhimento, e sua visita é uma experiência única para turistas de todo o mundo.',
      descricao4: 'Além de sua imponência, o Cristo Redentor está situado dentro do Parque Nacional da Tijuca, proporcionando aos visitantes uma imersão tanto na cultura quanto na natureza carioca.',
    },

    {
      id: 2,
      icone: 'sunny-outline',
      frase: 'Ideal para o dia, porém de noite também acontecem eventos por lá.',
      descricao1: 'O Bondinho do Pão de Açúcar é um dos principais cartões postais do Rio de Janeiro, oferecendo uma das vistas mais icônicas da cidade.',
      descricao2: 'O passeio leva os visitantes até o topo do Pão de Açúcar, uma das montanhas mais famosas do mundo, através de dois trajetos de bondinho. Durante o trajeto, é possível apreciar a deslumbrante vista da Baía de Guanabara, das praias cariocas, do Cristo Redentor e da cidade como um todo.',
      descricao3:'O Bondinho foi inaugurado em 1912 e, além de ser uma atração turística, é um marco histórico da engenharia brasileira.',
      descricao4: '',
    },

    {
      id: 3,
      icone: 'rainy-outline',
      frase: 'Caso seja um dia chuvoso, é uma ótima opção!',
      descricao1: 'O Museu do Amanhã, é um dos principais museus de ciência e inovação do Brasil.',
      descricao2: 'Com uma arquitetura futurista e sustentável, o museu oferece uma experiência imersiva e interativa, explorando temas como o futuro da humanidade, da tecnologia, da ciência e do meio ambiente.',
      descricao3: 'As exposições do Museu do Amanhã convidam os visitantes a refletir sobre questões globais e os desafios para um futuro mais sustentável e justo.',
      descricao4: 'Além de seu conteúdo educativo, o museu se destaca pela sua localização privilegiada.',
    },

    {
      id: 4,
      icone: 'rainy-outline',
      frase: 'Caso seja um dia chuvoso, é uma ótima opção!',
      descricao1: 'O AquaRio é o maior aquário marinho da América Latina, localizado na Zona Portuária do Rio de Janeiro.',
      descricao2: 'Com uma arquitetura moderna e ambientes interativos, o AquaRio oferece aos visitantes a chance de explorar a vida marinha de maneira única.',
      descricao3: 'O aquário abriga mais de 8 mil animais de 350 espécies diferentes, entre peixes, tubarões, raias e outros seres marinhos, distribuídos em grandes tanques e recintos imersivos. Sendo assim uma atração turística.',
      descricao4: '',
    },

    {
      id: 5,
      icone: 'sunny-outline',
      frase: 'Ideal para ver o nascer do sol ou o pôr do sol.',
      descricao1: 'A Vista Chinesa é um dos mirantes mais encantadores do Rio de Janeiro, localizado no Parque Nacional da Tijuca.',
      descricao2: 'Situada a 380 metros de altura, a vista oferece uma panorâmica deslumbrante da cidade, com destaque para a Baía de Guanabara, o Cristo Redentor, o Pão de Açúcar e as praias cariocas. O mirante, que conta com uma construção de estilo oriental, foi inaugurado em 1951 e é um excelente ponto para fotos e contemplação da natureza exuberante da Floresta da Tijuca.',
      descricao3: 'A Vista Chinesa é um local perfeito para quem busca tranquilidade, belas paisagens e um contato direto com a natureza carioca.',
      descricao4: '',
    },

    {
      id: 6,
      icone: 'sunny-outline',
      frase: 'Ideal para dia de sol.',
      descricao1: 'O Bioparque do Rio de Janeiro é um moderno zoológico que oferece uma experiência única de contato com a natureza, promovendo a educação ambiental e a preservação das espécies. Já foi reestruturado para proporcionar ambientes mais naturais e confortáveis para os animais, além de espaços interativos para os visitantes. Com um foco na conservação, o parque abriga uma grande variedade de fauna brasileira e internacional, incluindo espécies ameaçadas de extinção.',
      descricao2: '',
      descricao3: '',
      descricao4: '',
    },

    {
      id: 7,
      icone: 'sunny-outline',
      frase: 'Para dia de sol e ótimo pôr do sol!',
      descricao1: 'A Praia do Arpoador, é um dos destinos mais charmosos do Rio de Janeiro.',
      descricao2: 'Conhecida por sua vista e pela energia vibrante, a praia é um ótimo lugar para surfe, banhos de sol e para admirar o pôr do sol, que é considerado um dos mais bonitos da cidade.',
      descricao3: 'O nome "Arpoador" vem do antigo costume dos pescadores de arpoadar baleias na região, e hoje a praia atrai tanto turistas quanto locais.',
      descricao4: '',
    },

  ];
}
