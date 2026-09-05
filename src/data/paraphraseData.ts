export interface IELTSParaphraseItem {
  id: string;
  root: string;
  meaning: string;
  generalWord: string;
  c1c2Academic: string;
  exampleIeltsSentence: string;
  vietnameseTranslation: string;
  trunk: string;
  collocation?: string;
}

export const ieltsParaphraseData: IELTSParaphraseItem[] = [
  {
    id: "para-pel",
    root: "PEL / PULS",
    meaning: "Đẩy, tác động lực, tạo lực",
    generalWord: "Force / Push",
    c1c2Academic: "Compel / Propel",
    exampleIeltsSentence: "Economic incentives propel industrial green transition toward sustainability.",
    vietnameseTranslation: "Các ưu đãi kinh tế thúc đẩy quá trình chuyển đổi xanh của các ngành công nghiệp hướng tới sự bền vững.",
    trunk: "Trục 5: Xung Động, Tác Động & Buộc Ép",
    collocation: "Propel economic growth / Compel compliance"
  },
  {
    id: "para-mit",
    root: "MIT / MISS",
    meaning: "Phóng thích, gửi đi, phát tán",
    generalWord: "Send out / Discharge",
    c1c2Academic: "Emit / Transmit",
    exampleIeltsSentence: "Industrial manufacturing plants emit hazardous gases during high-capacity operation.",
    vietnameseTranslation: "Các nhà máy sản xuất công nghiệp phát thải khí nguy hại trong quá trình vận hành công suất cao.",
    trunk: "Trục 5: Xung Động, Tác Động & Buộc Ép",
    collocation: "Emit toxic emissions / Transmit pathogens"
  },
  {
    id: "para-fid",
    root: "FID / CRED",
    meaning: "Độ tin cậy, xác thực, danh dự",
    generalWord: "Trustworthy / Reliable",
    c1c2Academic: "Credible / Verifiable",
    exampleIeltsSentence: "Empirical sociological data must be objectively verifiable before shaping public policies.",
    vietnameseTranslation: "Dữ liệu xã hội học thực nghiệm phải có khả năng kiểm chứng một cách khách quan trước khi định hình chính sách công.",
    trunk: "Trục 6: Chân Lý, Đo Lường & Chuẩn Mực",
    collocation: "Credible source / Verifiable evidence"
  },
  {
    id: "para-val",
    root: "VAL / VAIL",
    meaning: "Sức mạnh, giá trị, hiệu lực",
    generalWord: "Powerful / Widespread",
    c1c2Academic: "Prevalent / Prevailing",
    exampleIeltsSentence: "Sedentary leisure habits are increasingly prevalent among urban adolescents.",
    vietnameseTranslation: "Các thói quen giải trí ít vận động đang ngày càng phổ biến trong giới thanh thiếu niên đô thị.",
    trunk: "Trục 6: Chân Lý, Đo Lường & Chuẩn Mực",
    collocation: "Prevalent condition / Prevailing attitude"
  },
  {
    id: "para-ten",
    root: "TEN / TAIN",
    meaning: "Nắm giữ, duy trì, chịu đựng",
    generalWord: "Keep / Maintain",
    c1c2Academic: "Retain / Sustain",
    exampleIeltsSentence: "Governments must devise actionable measures to retain skilled labor in rural regions.",
    vietnameseTranslation: "Các chính phủ phải đề ra các biện pháp khả thi để giữ chân lực lượng lao động có tay nghề ở vùng nông thôn.",
    trunk: "Trục 7: Vị Thế, Thuộc Tính & Bền Vững",
    collocation: "Retain talent / Sustain development"
  },
  {
    id: "para-sta",
    root: "STA / STAT",
    meaning: "Đứng yên, cố định, trì trệ",
    generalWord: "Not moving / Inactive",
    c1c2Academic: "Stagnant / Static",
    exampleIeltsSentence: "Wages across manufacturing sectors have remained virtually stagnant for over a decade.",
    vietnameseTranslation: "Tiền lương trong các ngành sản xuất gần như giữ nguyên trạng thái trì trệ trong hơn một thập kỷ.",
    trunk: "Trục 7: Vị Thế, Thuộc Tính & Bền Vững",
    collocation: "Stagnant wages / Static population"
  },
  {
    id: "para-via",
    root: "VIA / VOY",
    meaning: "Con đường, lối đi, hành trình",
    generalWord: "Feasible / Realistic",
    c1c2Academic: "Viable / Workable",
    exampleIeltsSentence: "Solar photovoltaic farms offer a commercially viable alternative to conventional fossil fuels.",
    vietnameseTranslation: "Các trang trại điện mặt trời quang điện cung cấp một giải pháp thay thế khả thi về mặt thương mại cho nhiên liệu hóa thạch thông thường.",
    trunk: "Trục 8: Vận Động Của Dòng Đời & Chuyển Dịch",
    collocation: "Commercially viable / Viable alternative"
  },
  {
    id: "para-tract",
    root: "TRACT",
    meaning: "Kéo dài, co rút, trừu tượng",
    generalWord: "Pull / Lengthen / Complicated",
    c1c2Academic: "Protracted / Abstract / Intractable",
    exampleIeltsSentence: "Protracted disputes between governing entities impede timely infrastructure deployment.",
    vietnameseTranslation: "Những tranh chấp kéo dài lê thê giữa các cơ quan quản lý cản trở việc triển khai cơ sở hạ tầng kịp thời.",
    trunk: "Trục 5: Xung Động, Tác Động & Buộc Ép",
    collocation: "Protracted negotiations / Intractable conflict"
  },
  {
    id: "para-gress",
    root: "GRESS / GRAD",
    meaning: "Bước đi, thoái trào, suy thoái",
    generalWord: "Move backward / Step down",
    c1c2Academic: "Regress / Retrograde / Degradation",
    exampleIeltsSentence: "Reimposing fossil fuel subsidies represents a retrograde policy step.",
    vietnameseTranslation: "Việc tái áp dụng trợ cấp nhiên liệu hóa thạch đại diện cho một bước đi chính sách thụt lùi.",
    trunk: "Trục 8: Vận Động Của Dòng Đời & Chuyển Dịch",
    collocation: "Retrograde step / Environmental degradation"
  },
  {
    id: "para-fin",
    root: "FIN / TERM",
    meaning: "Ranh giới, kết thúc, hạn định",
    generalWord: "End / Limit / Stop",
    c1c2Academic: "Finite / Terminate / Definitive",
    exampleIeltsSentence: "Human consumption patterns must respect the finite boundaries of planetary reserves.",
    vietnameseTranslation: "Các mô hình tiêu dùng của con người phải tôn trọng các giới hạn hữu hạn của các nguồn dự trữ trên hành tinh.",
    trunk: "Trục 8: Vận Động Của Dòng Đời & Chuyển Dịch",
    collocation: "Finite resources / Terminate contracts"
  },
  {
    id: "para-mort",
    root: "MORT / NECR",
    meaning: "Tử vong, chết chóc, vĩnh cửu",
    generalWord: "Death / Deadly / Never dying",
    c1c2Academic: "Mortality / Fatal / Immortal",
    exampleIeltsSentence: "Widespread inoculation drives have dramatically curtailed infant mortality rates worldwide.",
    vietnameseTranslation: "Các chiến dịch tiêm chủng rộng rãi đã làm giảm đáng kể tỷ lệ tử vong ở trẻ sơ sinh trên toàn thế giới.",
    trunk: "Trục 8: Vận Động Của Dòng Đời & Chuyển Dịch",
    collocation: "Infant mortality / Reduce mortality"
  },
  {
    id: "para-pos",
    root: "PON / POS",
    meaning: "Đặt để, kiến nghị, so sánh",
    generalWord: "Put together / Suggest / Put down",
    c1c2Academic: "Juxtapose / Propose / Posit",
    exampleIeltsSentence: "Documentaries juxtapose lavish consumerism with destitute shantytowns to illuminate structural disparity.",
    vietnameseTranslation: "Các bộ phim tài liệu đặt cạnh nhau lối sống tiêu dùng xa hoa với những khu ổ chuột cơ hàn để làm sáng tỏ sự phân hóa cấu trúc.",
    trunk: "Trục 7: Vị Thế, Thuộc Tính & Bền Vững",
    collocation: "Juxtapose views / Propose reforms"
  },
  {
    id: "para-sed",
    root: "SED / SID",
    meaning: "Ngồi yên, lắng xuống, sụt giảm",
    generalWord: "Calm down / Sit still / Settle",
    c1c2Academic: "Subside / Sedentary / Reside",
    exampleIeltsSentence: "Panic across international financial markets began to subside following government intervention.",
    vietnameseTranslation: "Sự hoảng loạn trên các thị trường tài chính quốc tế bắt đầu lắng dịu sau sự can thiệp của chính phủ.",
    trunk: "Trục 7: Vị Thế, Thuộc Tính & Bền Vững",
    collocation: "Storms subside / Sedentary employment"
  },
  {
    id: "para-ver",
    root: "VER / CERT",
    meaning: "Chân lý, chắc chắn, tính trung thực",
    generalWord: "Truth / Be sure / Prove",
    c1c2Academic: "Veracity / Ascertain / Certify",
    exampleIeltsSentence: "Independent auditors are commissioned to ascertain the veracity of corporate accounting disclosures.",
    vietnameseTranslation: "Các kiểm toán viên độc lập được ủy thác để xác định tính trung thực của các bản công bố kế toán doanh nghiệp.",
    trunk: "Trục 6: Chân Lý, Đo Lường & Chuẩn Mực",
    collocation: "Ascertain facts / Question veracity"
  },
  {
    id: "para-par",
    root: "SIMIL / PAR",
    meaning: "Ngang bằng, tương xứng, chênh lệch",
    generalWord: "Difference / Equal / Match",
    c1c2Academic: "Disparity / Parity / Assimilate",
    exampleIeltsSentence: "Legislative measures seek to eliminate gender wage disparity across professional sectors.",
    vietnameseTranslation: "Các biện pháp lập pháp tìm cách xóa bỏ sự chênh lệch tiền lương theo giới trên khắp các lĩnh vực chuyên nghiệp.",
    trunk: "Trục 6: Chân Lý, Đo Lường & Chuẩn Mực",
    collocation: "Income disparity / Wage parity"
  },
  {
    id: "para-metr-mod",
    root: "METR / MOD",
    meaning: "Đo lường, khuôn thước, điều chỉnh chừng mực",
    generalWord: "Change to fit the situation",
    c1c2Academic: "Modify policies to maintain parity",
    exampleIeltsSentence: "Policymakers must swiftly modify trade policies to maintain economic parity amid global currency volatility.",
    vietnameseTranslation: "Các nhà hoạch định chính sách phải nhanh chóng điều chỉnh các chính sách thương mại để duy trì sự tương quan kinh tế giữa bối cảnh biến động tiền tệ toàn cầu.",
    trunk: "Trục 9: Đo Lường, Chuẩn Mực & Định Lượng",
    collocation: "Modify policies / Maintain parity"
  },
  {
    id: "para-flict-fend",
    root: "FLICT / FEND",
    meaning: "Va chạm, giáng đòn, phòng vệ & đối kháng",
    generalWord: "Cause heavy damage to nature",
    c1c2Academic: "Inflict severe ecological damage",
    exampleIeltsSentence: "Unregulated industrial discharge threatens to inflict severe ecological damage on delicate riverine biomes.",
    vietnameseTranslation: "Nước thải công nghiệp không được kiểm soát đe dọa giáng họa sinh thái nghiêm trọng lên các quần xã sinh vật ven sông mong manh.",
    trunk: "Trục 10: Xung Đột, Phòng Thủ & Đối Kháng",
    collocation: "Inflict damage / Defensive measures"
  },
  {
    id: "para-trib-mun",
    root: "TRIB / MUN",
    meaning: "Phân bổ, thù lao, trách nhiệm công vụ",
    generalWord: "Give rewards based on work",
    c1c2Academic: "Provide remuneration commensurate with labor",
    exampleIeltsSentence: "Equitable institutions must ensure they provide remuneration commensurate with professional labor output.",
    vietnameseTranslation: "Các thể chế công bằng phải đảm bảo cung cấp thù lao tương xứng với khối lượng lao động chuyên môn.",
    trunk: "Trục 11: Phân Bổ, Sở Hữu & Cộng Đồng",
    collocation: "Commensurate remuneration / Municipal distribution"
  },
  {
    id: "para-opt-fin",
    root: "OPT / FIN",
    meaning: "Lựa chọn, tầm nhìn tối ưu, ranh giới hữu hạn",
    generalWord: "The best possible solution",
    c1c2Academic: "Identify an optimal compromise",
    exampleIeltsSentence: "Urban planning panels must identify an optimal compromise between high-density housing and urban greenery.",
    vietnameseTranslation: "Các hội đồng quy hoạch đô thị phải xác định một giải pháp dung hòa tối ưu giữa nhà ở mật độ cao và mảng xanh đô thị.",
    trunk: "Trục 12: Đích Đến, Dự Phán & Ý Hướng",
    collocation: "Optimal compromise / Definitive resolution"
  },
  {
    id: "para-lig-nex",
    root: "LIG / NEX",
    meaning: "Gắn kết, mối liên kết trung tâm, chuỗi liên hoàn",
    generalWord: "The connection between two things",
    c1c2Academic: "The complex nexus between poverty and crime",
    exampleIeltsSentence: "Sociological researchers frequently interrogate the complex nexus between generational poverty and urban delinquency.",
    vietnameseTranslation: "Các nhà nghiên cứu xã hội học thường xuyên chất vấn mối liên hệ trung tâm phức tạp giữa đói nghèo qua nhiều thế hệ và tội phạm thanh thiếu niên đô thị.",
    trunk: "Trục 13: Gắn Kết, Liên Tục & Thắt Chặt",
    collocation: "Complex nexus / Binding obligation"
  },
  {
    id: "para-ben-mal-nox",
    root: "BEN / MAL / NOX",
    meaning: "Tính thiện, độc hại, gây phương hại",
    generalWord: "Harmful chemicals",
    c1c2Academic: "Discharge noxious industrial contaminants",
    exampleIeltsSentence: "Heavy metallurgical smelters regularly discharge noxious industrial contaminants into regional atmospheric layers.",
    vietnameseTranslation: "Các xưởng luyện kim nặng thường xuyên xả các chất gây ô nhiễm công nghiệp độc hại vào các tầng khí quyển của khu vực.",
    trunk: "Trục 14: Tính Thiện, Ác, Lợi Ích & Thiệt Hại",
    collocation: "Noxious fumes / Beneficial outcome"
  },
  {
    id: "para-ple-vac-pauc",
    root: "PLE / VAC / PAUC",
    meaning: "Đầy đủ, trống rỗng, khan hiếm cùng cực",
    generalWord: "A serious lack of evidence",
    c1c2Academic: "A critical paucity of empirical findings",
    exampleIeltsSentence: "Pioneering climate models are severely handicapped by a critical paucity of empirical oceanic findings.",
    vietnameseTranslation: "Các mô hình khí hậu tiên phong bị cản trở nghiêm trọng bởi sự khan hiếm trầm trọng các phát hiện thực nghiệm về đại dương.",
    trunk: "Trục 15: Đầy Đủ, Thiếu Hụt & Dư Thừa",
    collocation: "Paucity of evidence / Replenish resources"
  },
  {
    id: "para-duc-rect",
    root: "DUC / RECT",
    meaning: "Dẫn dắt, nắn thẳng, quy định & khắc phục",
    generalWord: "Fix mistakes in the system",
    c1c2Academic: "Rectify institutional deficiencies",
    exampleIeltsSentence: "Judicial oversight bodies are mandated to rectify institutional deficiencies across regional law enforcement agencies.",
    vietnameseTranslation: "Các cơ quan giám sát tư pháp được trao thẩm quyền để khắc phục những khiếm khuyết mang tính thể chế tại các cơ quan thực thi pháp luật khu vực.",
    trunk: "Trục 16: Dẫn Dắt, Quản Trị & Thực Thi",
    collocation: "Rectify deficiencies / Conducive environment"
  },
  {
    id: "para-mut-morph",
    root: "MUT / MORPH / ALTER",
    meaning: "Biến đổi hình thái, đột biến, thích nghi",
    generalWord: "Unchangeable natural laws",
    c1c2Academic: "Immutable biological principles",
    exampleIeltsSentence: "Evolutionary biologists postulate that life forms must continuously adapt under immutable biological principles.",
    vietnameseTranslation: "Các nhà sinh học tiến hóa đưa ra định đề rằng các dạng sống phải liên tục thích nghi dưới những nguyên lý sinh học bất biến.",
    trunk: "Trục 17: Biến Đổi Hình Thái & Tương Đồng",
    collocation: "Immutable principles / Metamorphosis of structures"
  },
  {
    id: "para-luc-crypt",
    root: "LUC / LUM / CRYPT",
    meaning: "Chiếu sáng, minh bạch, mật mã & ẩn giấu",
    generalWord: "Explain clearly the main issue",
    c1c2Academic: "Elucidate underlying mechanisms",
    exampleIeltsSentence: "Neuroscientists deploy non-invasive fMRI scanning to elucidate underlying neural mechanisms governing memory consolidation.",
    vietnameseTranslation: "Các nhà khoa học thần kinh triển khai quét fMRI không xâm lấn để làm sáng tỏ các cơ chế thần kinh tiềm ẩn chi phối quá trình củng cố trí nhớ.",
    trunk: "Trục 18: Tính Minh Bạch, Phát Lộ & Ẩn Khuất",
    collocation: "Elucidate mechanisms / Cryptic instructions"
  }
];
