// Morphological Roots & IELTS Mindmap System
// Generated 4-Trunk Academic Architecture: 17 Root Stems with 400+ C1/C2 Academic Words

import { WordRoot } from '../types';
import { extraRoots } from './rootsDataExtra';
import { trunk10To13Roots } from './rootsDataTrunk10_13';
import { trunk14To18Roots } from './rootsDataTrunk14_18';

const baseRoots: WordRoot[] = [
  {
    "id": "stem-con-com",
    "root": "CON/COM/COL/COR-",
    "meaning": "Gắn kết, cùng nhau, cộng hưởng, tăng cường",
    "origin": "Tiền tố Latin (con-, com-, col-, cor-)",
    "description": "Biểu thị sự kết nối nhiều thành phần thành một thể thống nhất, đồng thuận ý chí, hoặc tăng cường tối đa mức độ hành động.",
    "tip": "Nhớ đến Connect (kết nối) hoặc Combine (kết hợp) – mọi thứ gom tụ về một mối hoặc đẩy mạnh uy lực.",
    "category": "Trục 1: Tiền Tố Định Hướng & Biến Đổi",
    "axis": "Trục 1",
    "axisTitle": "TRỤC 1: TIỀN TỐ ĐỊNH HƯỚNG & BIẾN ĐỔI",
    "axisSubtitle": "Action & Vector (Gắn kết & Tác động)",
    "stemKey": "CON/COM-",
    "exampleWords": [
      {
        "word": "Consolidate",
        "partOfSpeech": "v",
        "meaning": "Củng cố, hợp nhất vị thế",
        "visualBreakdown": "Con- (cùng nhau) + solid (vững chắc) + -ate (động từ)",
        "ieltsSentence": "The conglomerate sought to consolidate its market share through aggressive mergers.",
        "vietnameseTranslation": "Tập đoàn tìm cách củng cố thị phần của mình thông qua các thương vụ sáp nhập quyết liệt.",
        "level": "C1",
        "collocation": "Consolidate market position / Consolidate power"
      },
      {
        "word": "Contaminate",
        "partOfSpeech": "v",
        "meaning": "Làm ô nhiễm, nhiễm độc chéo",
        "visualBreakdown": "Con- (cùng nhau) + tamin (chạm vào, vấy bẩn) + -ate",
        "ieltsSentence": "Industrial effluent can severely contaminate freshwater aquifers if left untreated.",
        "vietnameseTranslation": "Nước thải công nghiệp có thể làm ô nhiễm nghiêm trọng các tầng ngậm nước ngọt nếu không được xử lý.",
        "level": "C1",
        "collocation": "Severely contaminate / Contaminate groundwater"
      },
      {
        "word": "Combustion",
        "partOfSpeech": "n",
        "meaning": "Sự bốc cháy, quá trình đốt cháy hoàn toàn",
        "visualBreakdown": "Com- (hoàn toàn) + bust (cháy) + -ion (danh từ)",
        "ieltsSentence": "Incomplete combustion of fossil fuels yields hazardous particulate emissions.",
        "vietnameseTranslation": "Quá trình đốt cháy không hoàn toàn của nhiên liệu hóa thạch tạo ra lượng phát thải bụi mịn nguy hại.",
        "level": "C2",
        "collocation": "Internal combustion engine / Spontaneous combustion"
      },
      {
        "word": "Coherent",
        "partOfSpeech": "adj",
        "meaning": "Mạch lạc, gắn kết logic chặt chẽ",
        "visualBreakdown": "Co- (cùng nhau) + her (dính kết) + -ent (tính từ)",
        "ieltsSentence": "Candidates must present a coherent line of argument throughout their academic essay.",
        "vietnameseTranslation": "Thí sinh phải trình bày một mạch lập luận gắn kết và mạch lạc xuyên suốt bài luận học thuật.",
        "level": "C1",
        "collocation": "Coherent argument / Coherent policy framework"
      },
      {
        "word": "Congregate",
        "partOfSpeech": "v",
        "meaning": "Tụ tập, tập hợp số đông",
        "visualBreakdown": "Con- (cùng nhau) + greg (bầy đàn) + -ate",
        "ieltsSentence": "Thousands of migratory birds congregate in this coastal estuary during late autumn.",
        "vietnameseTranslation": "Hàng ngàn con chim di cư tụ tập tại cửa sông ven biển này vào cuối mùa thu.",
        "level": "C1",
        "collocation": "Congregate in large numbers / Lawful congregation"
      },
      {
        "word": "Conspire",
        "partOfSpeech": "v",
        "meaning": "Cùng mưu tính ngầm, thông đồng",
        "visualBreakdown": "Con- (cùng nhau) + spire (thở, toan tính)",
        "ieltsSentence": "Unforeseen logistical bottlenecks conspired to delay the infrastructure rollout.",
        "vietnameseTranslation": "Những nút thắt hậu cần bất ngờ cùng hùa vào làm trì hoãn tiến độ triển khai cơ sở hạ tầng.",
        "level": "C2",
        "collocation": "Conspire against / Circumstances conspire"
      },
      {
        "word": "Converge",
        "partOfSpeech": "v",
        "meaning": "Đồng quy, hội tụ về một điểm",
        "visualBreakdown": "Con- (cùng nhau) + verge (nghiêng, hướng về)",
        "ieltsSentence": "Technological advancements and regulatory shifts are converging to reshape urban transit.",
        "vietnameseTranslation": "Những bước tiến công nghệ và sự thay đổi quy định đang hội tụ để định hình lại giao thông đô thị.",
        "level": "C1",
        "collocation": "Converging trends / Points converge"
      },
      {
        "word": "Concur",
        "partOfSpeech": "v",
        "meaning": "Đồng tình, có cùng quan điểm",
        "visualBreakdown": "Con- (cùng nhau) + cur (chạy theo cùng hướng)",
        "ieltsSentence": "Leading climatologists concur that anthropogenic emissions are the primary driver of warming.",
        "vietnameseTranslation": "Các nhà khí hậu học hàng đầu đồng tình rằng khí thải do con người gây ra là nguyên nhân chính gây ấm lên toàn cầu.",
        "level": "C1",
        "collocation": "Concur with findings / Unanimously concur"
      },
      {
        "word": "Corroborate",
        "partOfSpeech": "v",
        "meaning": "Chứng thực, củng cố bằng chứng thực tế",
        "visualBreakdown": "Cor- (tăng cường) + robor (mạnh mẽ) + -ate",
        "ieltsSentence": "Empirical data gathered from satellite telemetry corroborated the initial hypothesis.",
        "vietnameseTranslation": "Dữ liệu thực nghiệm thu thập từ cảm biến vệ tinh đã chứng thực cho giả thuyết ban đầu.",
        "level": "C2",
        "collocation": "Corroborate evidence / Corroborate an allegation"
      },
      {
        "word": "Collate",
        "partOfSpeech": "v",
        "meaning": "Đối chiếu, thu thập và sắp xếp dữ liệu",
        "visualBreakdown": "Col- (cùng nhau) + late (mang lại, đặt cùng)",
        "ieltsSentence": "The research team collated census data from over thirty municipalities.",
        "vietnameseTranslation": "Nhóm nghiên cứu đã đối chiếu và thu thập dữ liệu điều tra dân số từ hơn 30 đô thị.",
        "level": "C2",
        "collocation": "Collate data / Collate findings systematically"
      },
      {
        "word": "Commemorate",
        "partOfSpeech": "v",
        "meaning": "Tưởng niệm, ghi nhớ công lao chung",
        "visualBreakdown": "Com- (cùng nhau) + memor (trí nhớ) + -ate",
        "ieltsSentence": "A nationwide monument was erected to commemorate the pioneers of scientific exploration.",
        "vietnameseTranslation": "Một tượng đài cấp quốc gia đã được xây dựng để tưởng niệm những người tiên phong khám phá khoa học.",
        "level": "C1",
        "collocation": "Commemorate an anniversary / In commemoration of"
      },
      {
        "word": "Compatible",
        "partOfSpeech": "adj",
        "meaning": "Tương thích, hài hòa cùng nhau",
        "visualBreakdown": "Com- (cùng) + pati (chịu đựng) + -ible (có thể)",
        "ieltsSentence": "Economic expansion must be rendered compatible with long-term ecological conservation.",
        "vietnameseTranslation": "Sự mở rộng kinh tế phải được làm cho tương thích với việc bảo tồn sinh thái lâu dài.",
        "level": "C1",
        "collocation": "Mutually compatible / Highly compatible with"
      },
      {
        "word": "Comprehensive",
        "partOfSpeech": "adj",
        "meaning": "Toàn diện, bao hàm toàn bộ khía cạnh",
        "visualBreakdown": "Com- (hoàn toàn) + prehens (nắm bắt) + -ive",
        "ieltsSentence": "The municipal authority initiated a comprehensive review of urban zoning ordinances.",
        "vietnameseTranslation": "Chính quyền đô thị đã khởi động một cuộc rà soát toàn diện các quy định phân vùng đô thị.",
        "level": "C1",
        "collocation": "Comprehensive review / Comprehensive assessment"
      },
      {
        "word": "Conducive",
        "partOfSpeech": "adj",
        "meaning": "Có lợi, dẫn tới kết quả tích cực",
        "visualBreakdown": "Con- (cùng) + duc (dẫn dắt) + -ive",
        "ieltsSentence": "A tranquil environment is profoundly conducive to rigorous academic inquiry.",
        "vietnameseTranslation": "Một không gian yên tĩnh rất có lợi cho việc nghiên cứu học thuật nghiêm cẩn.",
        "level": "C1",
        "collocation": "Conducive to learning / Conducive to productivity"
      },
      {
        "word": "Condone",
        "partOfSpeech": "v",
        "meaning": "Tha thứ, làm ngơ dung túng sai trái",
        "visualBreakdown": "Con- (hoàn toàn) + done (cho, buông)",
        "ieltsSentence": "Academic institutions cannot condone any form of intellectual dishonesty.",
        "vietnameseTranslation": "Các tổ chức học thuật không thể dung túng cho bất kỳ hình thức gian lận học thuật nào.",
        "level": "C2",
        "collocation": "Refuse to condone / Condone malpractice"
      },
      {
        "word": "Constrain",
        "partOfSpeech": "v",
        "meaning": "Ràng buộc, kìm hãm, cưỡng bách",
        "visualBreakdown": "Con- (hoàn toàn) + strain (kéo căng, siết)",
        "ieltsSentence": "Budgetary austerity severely constrained the implementation of municipal welfare programs.",
        "vietnameseTranslation": "Chính sách thắt lưng buộc bụng đã kìm hãm nặng nề việc triển khai các chương trình phúc lợi công cộng.",
        "level": "C1",
        "collocation": "Constrain growth / Financial constraints"
      },
      {
        "word": "Contemplate",
        "partOfSpeech": "v",
        "meaning": "Trầm ngâm suy ngẫm, dự tính thấu đáo",
        "visualBreakdown": "Con- (cùng) + templ (không gian suy tưởng) + -ate",
        "ieltsSentence": "Policy planners must contemplate the catastrophic ramifications of rising sea levels.",
        "vietnameseTranslation": "Các nhà hoạch định chính sách phải suy ngẫm thấu đáo về những hậu quả thảm khốc của mực nước biển dâng.",
        "level": "C1",
        "collocation": "Contemplate the consequences / Deeply contemplate"
      },
      {
        "word": "Convivial",
        "partOfSpeech": "adj",
        "meaning": "Thân ái, chan hòa, ấm cúng vui vẻ",
        "visualBreakdown": "Con- (cùng nhau) + viv (sự sống) + -ial",
        "ieltsSentence": "The academic symposium fostered a remarkably convivial atmosphere among international delegates.",
        "vietnameseTranslation": "Hội nghị chuyên đề học thuật đã nuôi dưỡng bầu không khí chan hòa ấn tượng giữa các đại biểu quốc tế.",
        "level": "C2",
        "collocation": "Convivial atmosphere / Convivial gathering"
      },
      {
        "word": "Coalition",
        "partOfSpeech": "n",
        "meaning": "Liên minh, sự kết liên các tổ chức",
        "visualBreakdown": "Co- (cùng nhau) + alit (nuôi dưỡng, lớn lên) + -ion",
        "ieltsSentence": "A broad coalition of environmental advocates lobbied for stricter carbon taxation.",
        "vietnameseTranslation": "Một liên minh rộng lớn các nhà bảo vệ môi trường đã vận động hành lang để áp thuế carbon nghiêm ngặt hơn.",
        "level": "C1",
        "collocation": "Form a coalition / Ruling coalition"
      },
      {
        "word": "Concomitant",
        "partOfSpeech": "adj",
        "meaning": "Đi kèm đồng thời, đi liền theo",
        "visualBreakdown": "Con- (cùng) + comit (đồng hành) + -ant",
        "ieltsSentence": "Rapid urbanization is frequently accompanied by concomitant strain on municipal services.",
        "vietnameseTranslation": "Đô thị hóa thần tốc thường đi liền với áp lực phát sinh đồng thời lên các dịch vụ công ích đô thị.",
        "level": "C2",
        "collocation": "Concomitant rise / Concomitant phenomenon"
      },
      {
        "word": "Collusion",
        "partOfSpeech": "n",
        "meaning": "Sự câu kết ngầm bất chính, thông đồng",
        "visualBreakdown": "Col- (cùng) + lude (chơi trò, lừa gạt) + -ion",
        "ieltsSentence": "Antitrust watchdogs uncovered illicit collusion among major semiconductor suppliers.",
        "vietnameseTranslation": "Các cơ quan giám sát chống độc quyền đã phanh phui sự câu kết phi pháp giữa các nhà cung cấp bán dẫn lớn.",
        "level": "C2",
        "collocation": "Act in collusion with / Illicit collusion"
      },
      {
        "word": "Compendium",
        "partOfSpeech": "n",
        "meaning": "Bản tóm lược toàn diện, bách khoa tóm tắt",
        "visualBreakdown": "Com- (cùng nhau) + pend (cân đong) + -ium",
        "ieltsSentence": "The published atlas serves as an indispensable compendium of hydrological data.",
        "vietnameseTranslation": "Tập bản đồ được xuất bản đóng vai trò là một tài liệu tóm lược toàn diện không thể thiếu về dữ liệu thủy văn.",
        "level": "C2",
        "collocation": "Compendium of knowledge / Publish a compendium"
      },
      {
        "word": "Congenial",
        "partOfSpeech": "adj",
        "meaning": "Hợp tính, dễ chịu, tương đắc",
        "visualBreakdown": "Con- (cùng) + geni (bản tính) + -al",
        "ieltsSentence": "He found the tranquil university campus extraordinarily congenial to philosophical writing.",
        "vietnameseTranslation": "Ông nhận thấy khuôn viên đại học yên tĩnh cực kỳ phù hợp và hòa hợp cho việc sáng tác triết học.",
        "level": "C1",
        "collocation": "Congenial working environment / Congenial company"
      },
      {
        "word": "Conflate",
        "partOfSpeech": "v",
        "meaning": "Nhập nhằng đánh đồng, trộn lẫn hai khái niệm",
        "visualBreakdown": "Con- (cùng nhau) + flate (thổi, gom lại)",
        "ieltsSentence": "Commentators must be wary not to conflate temporary cyclical downturns with structural decay.",
        "vietnameseTranslation": "Các nhà bình luận cần cảnh giác không đánh đồng sự suy thoái chu kỳ tạm thời với sự mục ruỗng mang tính cơ cấu.",
        "level": "C2",
        "collocation": "Conflate distinct concepts / Conflate issues"
      },
      {
        "word": "Consensus",
        "partOfSpeech": "n",
        "meaning": "Sự đồng thuận, nhất trí tập thể",
        "visualBreakdown": "Con- (cùng) + sens (cảm nhận) + -us",
        "ieltsSentence": "Reaching an international consensus on carbon reduction remains diplomatic priority.",
        "vietnameseTranslation": "Đạt được sự đồng thuận quốc tế về cắt giảm khí thải carbon vẫn là ưu tiên ngoại giao số một.",
        "level": "C1",
        "collocation": "Scientific consensus / Reach broad consensus"
      }
    ]
  },
  {
    "id": "stem-de",
    "root": "DE-",
    "meaning": "Hạ xuống, làm cạn kiệt, bóc tách, suy thoái",
    "origin": "Tiền tố Latin (de-)",
    "description": "Biểu thị sự đi xuống, đào thải, giảm thiểu giá trị hoặc tước đoạt hoàn toàn một thuộc tính sẵn có.",
    "tip": "Nhớ đến Decrease (giảm) hoặc Decline (suy tàn) – chiều hướng luôn là kéo tụt xuống hoặc bóc bỏ.",
    "category": "Trục 1: Tiền Tố Định Hướng & Biến Đổi",
    "axis": "Trục 1",
    "axisTitle": "TRỤC 1: TIỀN TỐ ĐỊNH HƯỚNG & BIẾN ĐỔI",
    "axisSubtitle": "Action & Vector (Gắn kết & Tác động)",
    "stemKey": "DE-",
    "exampleWords": [
      {
        "word": "Deplete",
        "partOfSpeech": "v",
        "meaning": "Làm cạn kiệt nguồn tài nguyên",
        "visualBreakdown": "De- (bỏ, làm mất) + plete (làm đầy)",
        "ieltsSentence": "Unsustainable irrigation practices will rapidly deplete subterranean groundwater reservoirs.",
        "vietnameseTranslation": "Các phương pháp tưới tiêu thiếu bền vững sẽ nhanh chóng làm cạn kiệt các tầng ngậm nước ngầm dưới lòng đất.",
        "level": "C1",
        "collocation": "Deplete natural resources / Seriously deplete"
      },
      {
        "word": "Desalination",
        "partOfSpeech": "n",
        "meaning": "Sự khử muối, tách muối khỏi nước biển",
        "visualBreakdown": "De- (tách bỏ) + saline (muối) + -ation",
        "ieltsSentence": "Thermal desalination plants supply a pivotal proportion of potable water in arid jurisdictions.",
        "vietnameseTranslation": "Các nhà máy khử mặn nhiệt cung cấp tỷ trọng cốt lõi nước ngọt sinh hoạt tại các vùng khô hạn.",
        "level": "C2",
        "collocation": "Desalination plant / Seawater desalination"
      },
      {
        "word": "Detrimental",
        "partOfSpeech": "adj",
        "meaning": "Gây tổn hại, có hại cho sự phát triển",
        "visualBreakdown": "De- (xuống) + tri (cọ xát, mài mòn) + -ment + -al",
        "ieltsSentence": "Chronic sleep deprivation exerts a deeply detrimental effect on cognitive efficacy.",
        "vietnameseTranslation": "Thiếu ngủ kinh niên gây ra tác động vô cùng tai hại đối với hiệu suất nhận thức.",
        "level": "C1",
        "collocation": "Detrimental impact / Detrimental effect on health"
      },
      {
        "word": "Degradation",
        "partOfSpeech": "n",
        "meaning": "Sự suy thoái, xuống cấp chất lượng",
        "visualBreakdown": "De- (xuống) + grad (bước, cấp bậc) + -ation",
        "ieltsSentence": "Intensive monoculture fosters catastrophic soil degradation across arable plains.",
        "vietnameseTranslation": "Nền độc canh thâm canh gây ra sự suy thoái đất canh tác thảm khốc trên khắp các đồng bằng màu mỡ.",
        "level": "C1",
        "collocation": "Environmental degradation / Land degradation"
      },
      {
        "word": "Devastate",
        "partOfSpeech": "v",
        "meaning": "Tàn phá, hủy diệt tan hoang",
        "visualBreakdown": "De- (hoàn toàn) + vast (trống hoang, vắng tanh) + -ate",
        "ieltsSentence": "Flash floods devastated fragile infrastructure throughout the remote mountainous valleys.",
        "vietnameseTranslation": "Lũ quét đã tàn phá tan hoang cơ sở hạ tầng mỏng manh khắp các thung lũng miền núi hẻo lánh.",
        "level": "C1",
        "collocation": "Devastate communities / Devastate the economy"
      },
      {
        "word": "Deteriorate",
        "partOfSpeech": "v",
        "meaning": "Xấu đi, thoái hóa trầm trọng",
        "visualBreakdown": "De- + terior (kém hơn, tồi hơn) + -ate",
        "ieltsSentence": "Air quality indices deteriorate markedly during stagnant winter inversions.",
        "vietnameseTranslation": "Các chỉ số chất lượng không khí suy giảm rõ rệt trong những đợt nghịch nhiệt mùa đông lặng gió.",
        "level": "C1",
        "collocation": "Deteriorate rapidly / Relations deteriorate"
      },
      {
        "word": "Demolish",
        "partOfSpeech": "v",
        "meaning": "Phá hủy, giật sập công trình/luận điểm",
        "visualBreakdown": "De- (xuống) + mol (khối lớn) + -ish",
        "ieltsSentence": "The municipal council resolved to demolish dilapidated tenements to construct civic parks.",
        "vietnameseTranslation": "Hội đồng thành phố đã quyết nghị phá dỡ các khu chung cư dột nát để xây dựng công viên công cộng.",
        "level": "C1",
        "collocation": "Demolish a building / Demolish an argument"
      },
      {
        "word": "Depreciate",
        "partOfSpeech": "v",
        "meaning": "Khấu hao, giảm giá trị tài sản",
        "visualBreakdown": "De- (hạ xuống) + prec (giá cả) + -i- + -ate",
        "ieltsSentence": "Industrial machinery depreciates substantially within its first five operational years.",
        "vietnameseTranslation": "Máy móc công nghiệp bị khấu hao giá trị đáng kể trong 5 năm vận hành đầu tiên.",
        "level": "C1",
        "collocation": "Depreciate in value / Rapidly depreciate"
      },
      {
        "word": "Devalue",
        "partOfSpeech": "v",
        "meaning": "Phá giá tiền tệ, làm mất phẩm giá",
        "visualBreakdown": "De- (hạ) + value (giá trị)",
        "ieltsSentence": "The central monetary authority intervened to devalue the national currency and stimulate exports.",
        "vietnameseTranslation": "Cơ quan quản lý tiền tệ trung ương đã can thiệp để phá giá đồng nội tệ nhằm kích thích xuất khẩu.",
        "level": "C1",
        "collocation": "Devalue the currency / Devalue contributions"
      },
      {
        "word": "Delineate",
        "partOfSpeech": "v",
        "meaning": "Vạch rõ, phác họa ranh giới chi tiết",
        "visualBreakdown": "De- (hoàn toàn) + line (đường nét) + -ate",
        "ieltsSentence": "The bilateral treaty clearly delineates maritime boundaries between the littoral states.",
        "vietnameseTranslation": "Hiệp ước song phương phân định rõ ràng các đường ranh giới biển giữa các quốc gia duyên hải.",
        "level": "C2",
        "collocation": "Clearly delineate / Delineate responsibilities"
      },
      {
        "word": "Deficit",
        "partOfSpeech": "n",
        "meaning": "Sự thâm hụt cán cân/ngân sách",
        "visualBreakdown": "De- (thiếu) + fic (làm ra) + -it",
        "ieltsSentence": "The escalating trade deficit prompted legislators to impose tariffs on foreign imports.",
        "vietnameseTranslation": "Sự thâm hụt thương mại ngày càng tăng đã thúc giục các nhà lập pháp áp thuế quan lên hàng nhập khẩu.",
        "level": "C1",
        "collocation": "Budget deficit / Trade deficit"
      },
      {
        "word": "Denounce",
        "partOfSpeech": "v",
        "meaning": "Lên án công khai, kịch liệt tố cáo",
        "visualBreakdown": "De- (xuống) + nounce (tuyên bố)",
        "ieltsSentence": "Humanitarian delegations forcefully denounced the unlawful blockade of food convoys.",
        "vietnameseTranslation": "Các phái đoàn nhân đạo đã lên án kịch liệt hành vi phong tỏa trái phép các đoàn xe chở lương thực.",
        "level": "C1",
        "collocation": "Denounce corruption / Strongly denounce"
      },
      {
        "word": "Depict",
        "partOfSpeech": "v",
        "meaning": "Khắc họa, miêu tả chân thực",
        "visualBreakdown": "De- (hoàn toàn) + pict (vẽ)",
        "ieltsSentence": "Historical archives depict the harrowing tribulations endured during the agrarian famine.",
        "vietnameseTranslation": "Các kho lưu trữ lịch sử khắc họa những gian nan đau thương phải gánh chịu trong nạn đói nông nghiệp.",
        "level": "C1",
        "collocation": "Accurately depict / Depict reality"
      },
      {
        "word": "Deride",
        "partOfSpeech": "v",
        "meaning": "Chế giễu, nhạo báng cay độc",
        "visualBreakdown": "De- (xuống) + ride (cười)",
        "ieltsSentence": "Skeptics initially derided the pioneer's solar proposition as utopian daydreaming.",
        "vietnameseTranslation": "Những người hoài nghi ban đầu đã chế giễu đề xuất năng lượng mặt trời của người tiên phong là mộng tưởng hão huyền.",
        "level": "C2",
        "collocation": "Deride efforts / Universally derided"
      },
      {
        "word": "Deprive",
        "partOfSpeech": "v",
        "meaning": "Tước đoạt, bóc bỏ quyền lợi căn bản",
        "visualBreakdown": "De- (tách bỏ) + prive (riêng tư, sở hữu)",
        "ieltsSentence": "Severe socio-economic marginalization deprives rural adolescents of equitable schooling.",
        "vietnameseTranslation": "Tình trạng ngoài rìa kinh tế xã hội gay gắt đã tước đi của thanh thiếu niên nông thôn cơ hội học hành bình đẳng.",
        "level": "C1",
        "collocation": "Deprive someone of rights / Sleep deprived"
      },
      {
        "word": "Desolate",
        "partOfSpeech": "adj",
        "meaning": "Hoang tàn, cô quạnh, tiêu điều",
        "visualBreakdown": "De- (hoàn toàn) + sol (cô độc) + -ate",
        "ieltsSentence": "Prolonged droughts converted once productive grasslands into desolate salt pans.",
        "vietnameseTranslation": "Hạn hán kéo dài đã biến những thảo nguyên từng trù phú thành những bãi muối hoang tàn xơ xác.",
        "level": "C2",
        "collocation": "Desolate landscape / Bleak and desolate"
      },
      {
        "word": "Detract",
        "partOfSpeech": "v",
        "meaning": "Làm giảm bớt giá trị/uy tín",
        "visualBreakdown": "De- (xuống) + tract (kéo)",
        "ieltsSentence": "Minor stylistic shortcomings should not detract from the seminal importance of the dissertation.",
        "vietnameseTranslation": "Những khiếm khuyết nhỏ về mặt hành văn không nên làm giảm đi tầm quan trọng mang tính bước ngoặt của luận văn.",
        "level": "C2",
        "collocation": "Detract from the merits / In no way detract"
      },
      {
        "word": "Deter",
        "partOfSpeech": "v",
        "meaning": "Răn đe, làm chùn bước ý định xấu",
        "visualBreakdown": "De- (ra khỏi) + ter (sợ hãi)",
        "ieltsSentence": "Rigorous criminal sentencing frameworks aim primarily to deter prospective transgressions.",
        "vietnameseTranslation": "Các khung hình phạt hình sự nghiêm khắc chủ yếu nhằm mục đích răn đe các hành vi vi phạm tiềm tàng.",
        "level": "C1",
        "collocation": "Deter crime / Act as a deterrent"
      },
      {
        "word": "Deviate",
        "partOfSpeech": "v",
        "meaning": "Chệch hướng, sai lệch chuẩn mực",
        "visualBreakdown": "De- (khỏi) + via (con đường) + -te",
        "ieltsSentence": "The laboratory outcome deviated statistically from standard baseline distributions.",
        "vietnameseTranslation": "Kết quả phòng thí nghiệm đã sai lệch mang tính thống kê so với phân phối chuẩn mực ban đầu.",
        "level": "C1",
        "collocation": "Deviate from norms / Standard deviation"
      },
      {
        "word": "Devoid",
        "partOfSpeech": "adj",
        "meaning": "Trống rỗng, hoàn toàn không có",
        "visualBreakdown": "De- (hoàn toàn) + void (trống không)",
        "ieltsSentence": "The arid lunar terrain is entirely devoid of organic atmosphere or liquid moisture.",
        "vietnameseTranslation": "Địa hình mặt trăng khô cằn hoàn toàn không có bầu khí quyển hữu cơ hay hơi ẩm dạng lỏng.",
        "level": "C1",
        "collocation": "Devoid of substance / Entirely devoid of"
      },
      {
        "word": "Decelerate",
        "partOfSpeech": "v",
        "meaning": "Giảm tốc độ, hãm lại tiến trình",
        "visualBreakdown": "De- (giảm) + celer (tốc độ) + -ate",
        "ieltsSentence": "Fiscal tightening was deployed purposefully to decelerate runaway inflationary pressure.",
        "vietnameseTranslation": "Việc thắt chặt tài khóa đã được áp dụng có chủ đích nhằm làm giảm tốc áp lực lạm phát phi mã.",
        "level": "C1",
        "collocation": "Decelerate growth / Cause to decelerate"
      },
      {
        "word": "Decentralize",
        "partOfSpeech": "v",
        "meaning": "Phân quyền, phi tập trung hóa",
        "visualBreakdown": "De- (bỏ) + central (trung tâm) + -ize",
        "ieltsSentence": "Democratic reform sought to decentralize administrative autonomy to regional councils.",
        "vietnameseTranslation": "Cải cách dân chủ tìm cách phân quyền tự chủ hành chính cho các hội đồng khu vực địa phương.",
        "level": "C1",
        "collocation": "Decentralize authority / Decentralized governance"
      },
      {
        "word": "Deforestation",
        "partOfSpeech": "n",
        "meaning": "Nạn phá rừng, triệt phá mảng xanh",
        "visualBreakdown": "De- (loại bỏ) + forest (rừng) + -ation",
        "ieltsSentence": "Unchecked deforestation in the tropical biome accelerates carbon release and species extinction.",
        "vietnameseTranslation": "Nạn phá rừng tràn lan ở quần xã sinh vật nhiệt đới đẩy nhanh sự giải phóng carbon và tuyệt chủng giống loài.",
        "level": "C1",
        "collocation": "Combat deforestation / Rampant deforestation"
      },
      {
        "word": "Demarcate",
        "partOfSpeech": "v",
        "meaning": "Phân định, vạch rõ lằn ranh giới hạn",
        "visualBreakdown": "De- + mark (dấu vết) + -ate",
        "ieltsSentence": "Clear legislative statutes must demarcate the constitutional bounds of executive authority.",
        "vietnameseTranslation": "Các đạo luật rõ ràng phải phân định ranh giới hiến định của quyền hành pháp.",
        "level": "C2",
        "collocation": "Demarcate boundaries / Strictly demarcate"
      },
      {
        "word": "Deconstruct",
        "partOfSpeech": "v",
        "meaning": "Giải cấu trúc, bóc tách mổ xẻ",
        "visualBreakdown": "De- (tháo dỡ) + construct (xây dựng)",
        "ieltsSentence": "Literary theorists deconstruct classical texts to uncover concealed ideological biases.",
        "vietnameseTranslation": "Các nhà lý luận văn học bóc tách giải cấu trúc các văn bản cổ điển để khám phá những định kiến ý thức hệ tiềm ẩn.",
        "level": "C2",
        "collocation": "Deconstruct a narrative / Deconstruct myths"
      }
    ]
  },
  {
    "id": "stem-ex-e",
    "root": "EX/E/EF-",
    "meaning": "Đưa ra ngoài, bộc lộ, phát tán triệt để",
    "origin": "Tiền tố Latin (ex-, e-, ef-)",
    "description": "Biểu thị sự di chuyển từ trong ra ngoài, tách khỏi tình trạng gò bó ban đầu, hoặc hoàn thành một việc triệt để đến mức tối đa.",
    "tip": "Nhớ đến Exit (lối thoát ra ngoài) hoặc Export (xuất khẩu) – đều có hướng bộc lộ ra phía ngoài.",
    "category": "Trục 1: Tiền Tố Định Hướng & Biến Đổi",
    "axis": "Trục 1",
    "axisTitle": "TRỤC 1: TIỀN TỐ ĐỊNH HƯỚNG & BIẾN ĐỔI",
    "axisSubtitle": "Action & Vector (Gắn kết & Tác động)",
    "stemKey": "EX/E-",
    "exampleWords": [
      {
        "word": "Effluent",
        "partOfSpeech": "n",
        "meaning": "Dòng nước thải công nghiệp xả ra nguồn tiếp nhận",
        "visualBreakdown": "Ef- (ra ngoài) + flu (chảy) + -ent",
        "ieltsSentence": "Untreated industrial effluent severely pollutes vulnerable fluvial ecosystems.",
        "vietnameseTranslation": "Nước thải công nghiệp chưa qua xử lý gây ô nhiễm nặng nề cho các hệ sinh thái sông ngòi nhạy cảm.",
        "level": "C2",
        "collocation": "Industrial effluent / Discharge effluent"
      },
      {
        "word": "Emission",
        "partOfSpeech": "n",
        "meaning": "Sự phát thải khí ô nhiễm ra môi trường",
        "visualBreakdown": "E- (ra ngoài) + miss (gửi đi, phát) + -ion",
        "ieltsSentence": "Stringent carbon caps seek to curb vehicle exhaust emissions substantially.",
        "vietnameseTranslation": "Các hạn ngạch carbon nghiêm ngặt nhằm cắt giảm đáng kể lượng khí thải từ phương tiện giao thông.",
        "level": "C1",
        "collocation": "Carbon emissions / Curtail emissions"
      },
      {
        "word": "Eradicate",
        "partOfSpeech": "v",
        "meaning": "Nhổ tận gốc rễ, bài trừ triệt để",
        "visualBreakdown": "E- (ra ngoài) + radic (gốc rễ) + -ate",
        "ieltsSentence": "Targeted vaccination drives succeeded in eradicating lethal endemic scourges.",
        "vietnameseTranslation": "Các chiến dịch tiêm chủng có mục tiêu đã thành công trong việc trừ tiệt các mầm bệnh đặc hữu chết người.",
        "level": "C1",
        "collocation": "Eradicate poverty / Eradicate disease"
      },
      {
        "word": "Exemplify",
        "partOfSpeech": "v",
        "meaning": "Làm ví dụ điển hình, minh họa rõ nét",
        "visualBreakdown": "Ex- (ngoài) + empl (lấy ra) + -ify",
        "ieltsSentence": "Urban botanical corridors exemplify innovative climate adaptation strategies.",
        "vietnameseTranslation": "Các hành lang thực vật đô thị minh họa điển hình cho chiến lược thích ứng với biến đổi khí hậu đầy sáng tạo.",
        "level": "C1",
        "collocation": "Exemplify a trend / Perfectly exemplify"
      },
      {
        "word": "Exacerbate",
        "partOfSpeech": "v",
        "meaning": "Làm trầm trọng thêm sự tình tiêu cực",
        "visualBreakdown": "Ex- (triệt để) + acerb (chua chát, gay gắt) + -ate",
        "ieltsSentence": "Prolonged heatwaves exacerbate existing water scarcity in arid jurisdictions.",
        "vietnameseTranslation": "Các đợt nắng nóng kéo dài làm trầm trọng thêm tình trạng khan hiếm nước sẵn có tại các vùng khô cằn.",
        "level": "C1",
        "collocation": "Exacerbate problems / Exacerbate inequalities"
      },
      {
        "word": "Excavate",
        "partOfSpeech": "v",
        "meaning": "Khai quật, đào bới lòng đất lên",
        "visualBreakdown": "Ex- (ra ngoài) + cav (khoét rỗng) + -ate",
        "ieltsSentence": "Archaeologists excavated ancient settlement remnants preserved beneath fluvial silt.",
        "vietnameseTranslation": "Các nhà khảo cổ học đã khai quật tàn tích khu định cư cổ đại được lưu giữ dưới lớp phù sa sông.",
        "level": "C1",
        "collocation": "Excavate ruins / Archaeological excavation"
      },
      {
        "word": "Exorbitant",
        "partOfSpeech": "adj",
        "meaning": "Đắt đỏ cắt cổ, vượt quá mức chuẩn",
        "visualBreakdown": "Ex- (ra ngoài) + orbit (quỹ đạo) + -ant",
        "ieltsSentence": "Tenants face exorbitant rental rates in densely populated metropolitan districts.",
        "vietnameseTranslation": "Người thuê nhà phải đối mặt với mức giá thuê cắt cổ tại các quận đô thị đông đúc.",
        "level": "C2",
        "collocation": "Exorbitant prices / Exorbitant costs"
      },
      {
        "word": "Expedite",
        "partOfSpeech": "v",
        "meaning": "Xúc tiến, đẩy nhanh tiến trình giải quyết",
        "visualBreakdown": "Ex- (ra khỏi) + ped (chân - giải phóng chân) + -ite",
        "ieltsSentence": "Streamlined administrative workflows expedite clinical trials for lifesaving pharmaceuticals.",
        "vietnameseTranslation": "Quy trình làm việc hành chính tinh gọn giúp đẩy nhanh các thử nghiệm lâm sàng cho các loại dược phẩm cứu người.",
        "level": "C1",
        "collocation": "Expedite the process / Expedite approval"
      },
      {
        "word": "Explicit",
        "partOfSpeech": "adj",
        "meaning": "Minh bạch, rõ ràng không úp mở",
        "visualBreakdown": "Ex- (ra ngoài) + plic (gấp nếp - mở nếp gấp) + -it",
        "ieltsSentence": "The contractual statute outlines explicit parameters for environmental compliance.",
        "vietnameseTranslation": "Điều khoản hợp đồng vạch ra các thông số rõ ràng minh bạch về việc tuân thủ môi trường.",
        "level": "C1",
        "collocation": "Explicit instructions / Explicit guidelines"
      },
      {
        "word": "Exploit",
        "partOfSpeech": "v",
        "meaning": "Khai thác tối đa tiềm năng, bóc lột",
        "visualBreakdown": "Ex- (ra ngoài) + ploit (mở rộng)",
        "ieltsSentence": "Emerging industries actively exploit regenerative energy resources to minimize overheads.",
        "vietnameseTranslation": "Các ngành công nghiệp mới nổi tích cực khai thác tài nguyên năng lượng tái sinh để giảm thiểu chi phí vận hành.",
        "level": "C1",
        "collocation": "Exploit resources / Commercial exploitation"
      },
      {
        "word": "Expound",
        "partOfSpeech": "v",
        "meaning": "Trình bày tường tận, diễn giải học thuyết",
        "visualBreakdown": "Ex- (ra ngoài) + pound (đặt ra)",
        "ieltsSentence": "The treatise expounds economic principles governing sustainable sovereign debt.",
        "vietnameseTranslation": "Chuyên luận diễn giải tường tận các nguyên tắc kinh tế chi phối nợ công bền vững.",
        "level": "C2",
        "collocation": "Expound a doctrine / Expound ideas"
      },
      {
        "word": "Extenuate",
        "partOfSpeech": "v",
        "meaning": "Làm giảm nhẹ mức độ nghiêm trọng",
        "visualBreakdown": "Ex- (ra ngoài) + tenu (thanh mảnh) + -ate",
        "ieltsSentence": "Judges considered extenuating economic duress prior to penal sentencing.",
        "vietnameseTranslation": "Các thẩm phán đã xem xét áp lực kinh tế giảm nhẹ trước khi tuyên án hình sự.",
        "level": "C2",
        "collocation": "Extenuating circumstances / Mitigate and extenuate"
      },
      {
        "word": "Extirpate",
        "partOfSpeech": "v",
        "meaning": "Trừ khử triệt để, diệt sạch mầm mống",
        "visualBreakdown": "Ex- (ra ngoài) + stirp (gốc rễ cây) + -ate",
        "ieltsSentence": "Biosecurity wardens mobilized swiftly to extirpate the virulent parasite outbreak.",
        "vietnameseTranslation": "Các nhân viên an toàn sinh học đã khẩn trương huy động lực lượng để trừ khử triệt để đợt bùng phát ký sinh trùng nguy hại.",
        "level": "C2",
        "collocation": "Extirpate an epidemic / Extirpate weeds"
      },
      {
        "word": "Extrapolate",
        "partOfSpeech": "v",
        "meaning": "Ngoại suy, dự đoán xu thế rộng lớn",
        "visualBreakdown": "Extra- (bên ngoài) + pol (sắp đặt) + -ate",
        "ieltsSentence": "Researchers extrapolate climate vulnerability models using decades of precipitation metrics.",
        "vietnameseTranslation": "Các nhà nghiên cứu ngoại suy các mô hình dễ bị tổn thương khí hậu bằng cách sử dụng các chỉ số lượng mưa hàng thập kỷ.",
        "level": "C2",
        "collocation": "Extrapolate from data / Extrapolate trends"
      },
      {
        "word": "Exuberant",
        "partOfSpeech": "adj",
        "meaning": "Tràn đầy sinh khí, xum xuê tươi tốt",
        "visualBreakdown": "Ex- (triệt để) + uber (màu mỡ) + -ant",
        "ieltsSentence": "The rainforest biome boasts exuberant vegetation alongside extraordinary fauna diversity.",
        "vietnameseTranslation": "Quần xã rừng mưa sở hữu thảm thực vật xum xuê tươi tốt cùng sự đa dạng phi thường về hệ động vật.",
        "level": "C2",
        "collocation": "Exuberant foliage / Exuberant energy"
      },
      {
        "word": "Elucidate",
        "partOfSpeech": "v",
        "meaning": "Làm sáng tỏ, giải thích rành mạch",
        "visualBreakdown": "E- (ra ngoài) + lucid (sáng sủa) + -ate",
        "ieltsSentence": "Recent biochemical breakthroughs elucidate the molecular pathways of immune resistance.",
        "vietnameseTranslation": "Những đột phá sinh hóa gần đây làm sáng tỏ các con đường phân tử của khả năng đề kháng miễn dịch.",
        "level": "C2",
        "collocation": "Elucidate mechanisms / Elucidate the theory"
      },
      {
        "word": "Emancipate",
        "partOfSpeech": "v",
        "meaning": "Giải phóng, giải thoát khỏi áp bức",
        "visualBreakdown": "E- (ra ngoài) + man (tay) + cip (nắm) + -ate",
        "ieltsSentence": "Universal suffrage and accessible tertiary schooling emancipated underprivileged demographics.",
        "vietnameseTranslation": "Quyền phổ thông đầu phiếu và giáo dục đại học dễ tiếp cận đã giải phóng các nhóm nhân khẩu học chịu nhiều thiệt thòi.",
        "level": "C2",
        "collocation": "Emancipate from bondage / Political emancipation"
      },
      {
        "word": "Emerge",
        "partOfSpeech": "v",
        "meaning": "Nổi lên, xuất hiện ra ngoài ánh sáng",
        "visualBreakdown": "E- (ra ngoài) + merge (nhúng chìm)",
        "ieltsSentence": "Novel epidemiological challenges continuously emerge amidst rapid cross-border mobility.",
        "vietnameseTranslation": "Các thách thức dịch tễ học mới liên tục nổi lên trong bối cảnh di chuyển xuyên biên giới thần tốc.",
        "level": "C1",
        "collocation": "Emerge as a dominant force / Newly emerged"
      },
      {
        "word": "Evacuate",
        "partOfSpeech": "v",
        "meaning": "Sơ tán người dân khỏi khu vực hiểm họa",
        "visualBreakdown": "E- (ra ngoài) + vacu (trống rỗng) + -ate",
        "ieltsSentence": "Authorities evacuated waterfront communities prior to the onset of the tempest.",
        "vietnameseTranslation": "Chính quyền đã sơ tán các cộng đồng ven sông trước khi cơn bão dữ ập đến.",
        "level": "C1",
        "collocation": "Evacuate civilians / Emergency evacuation"
      },
      {
        "word": "Evaporate",
        "partOfSpeech": "v",
        "meaning": "Bốc hơi, biến mất nhanh chóng",
        "visualBreakdown": "E- (ra ngoài) + vapor (hơi nước) + -ate",
        "ieltsSentence": "Investor enthusiasm evaporated abruptly following disclosure of the budgetary shortfall.",
        "vietnameseTranslation": "Sự hào hứng của nhà đầu tư bốc hơi đột ngột sau khi thâm hụt ngân sách bị tiết lộ.",
        "level": "C1",
        "collocation": "Evaporate into thin air / Moisture evaporates"
      },
      {
        "word": "Exonerate",
        "partOfSpeech": "v",
        "meaning": "Minh oan, tuyên bố vô tội hoàn toàn",
        "visualBreakdown": "Ex- (ra khỏi) + oner (gánh nặng) + -ate",
        "ieltsSentence": "Exculpatory forensic evidence exonerated the wrongly accused archivist.",
        "vietnameseTranslation": "Bằng chứng pháp y gỡ tội đã minh oan hoàn toàn cho viên quản thủ văn thư bị buộc tội oan.",
        "level": "C2",
        "collocation": "Exonerate from blame / Completely exonerated"
      },
      {
        "word": "Evoke",
        "partOfSpeech": "v",
        "meaning": "Khơi dậy, gọi ký ức/cảm xúc trở về",
        "visualBreakdown": "E- (ra ngoài) + voke (tiếng gọi)",
        "ieltsSentence": "Architectural heritage evocatively evokes municipal memories of bygone industrial prosperity.",
        "vietnameseTranslation": "Di sản kiến trúc khơi dậy một cách gợi cảm những ký ức đô thị về sự thịnh vượng công nghiệp thời đã qua.",
        "level": "C1",
        "collocation": "Evoke memories / Evoke emotions"
      },
      {
        "word": "Exclude",
        "partOfSpeech": "v",
        "meaning": "Loại trừ, không cho gia nhập/tiếp cận",
        "visualBreakdown": "Ex- (ra ngoài) + clude (đóng chặt)",
        "ieltsSentence": "Discriminatory lending practices historically excluded disadvantaged enclaves from homeownership.",
        "vietnameseTranslation": "Các phương thức cho vay mang tính phân biệt đối xử trước đây đã loại trừ các khu dân cư thiệt thòi khỏi quyền sở hữu nhà.",
        "level": "C1",
        "collocation": "Exclude from benefits / Mutually exclusive"
      },
      {
        "word": "Exhale",
        "partOfSpeech": "v",
        "meaning": "Thở ra, phả khí ra ngoài",
        "visualBreakdown": "Ex- (ra ngoài) + hale (hơi thở)",
        "ieltsSentence": "Deciduous canopies absorb carbon dioxide during photosynthesis and exhale vital oxygen.",
        "vietnameseTranslation": "Tán cây rụng lá hấp thụ carbon dioxide trong quá trình quang hợp và phả ra oxy thiết yếu.",
        "level": "C1",
        "collocation": "Inhale and exhale / Exhale deeply"
      },
      {
        "word": "Expatriate",
        "partOfSpeech": "n",
        "meaning": "Chuyên gia làm việc định cư ở nước ngoài",
        "visualBreakdown": "Ex- (ngoài) + patri (quê hương) + -ate",
        "ieltsSentence": "Multinational consortia deploy skilled expatriates to oversee offshore development nodes.",
        "vietnameseTranslation": "Các tập đoàn đa quốc gia cử các chuyên gia làm việc ở nước ngoài dày dạn kỹ năng để giám sát các đầu mối phát triển ở hải ngoại.",
        "level": "C1",
        "collocation": "Expatriate community / Highly skilled expatriate"
      }
    ]
  },
  {
    "id": "stem-in-im",
    "root": "IN/IM/IL/IR-",
    "meaning": "Thâm nhập vào bên trong HOẶC Phủ định (không/bất)",
    "origin": "Tiền tố Latin (in-, im-, il-, ir-)",
    "description": "Mang 2 chiều hướng nghĩa quan trọng bậc nhất: 1) Hướng vào chiều sâu nội tại (inward); 2) Tiền tố phủ định mang nghĩa phủ quyết, bất khả, không thể.",
    "tip": "Nhớ đến Inside (bên trong) HOẶC Impossible (bất khả thi) – nhận diện nghĩa theo gốc từ ghép liền sau.",
    "category": "Trục 1: Tiền Tố Định Hướng & Biến Đổi",
    "axis": "Trục 1",
    "axisTitle": "TRỤC 1: TIỀN TỐ ĐỊNH HƯỚNG & BIẾN ĐỔI",
    "axisSubtitle": "Action & Vector (Gắn kết & Tác động)",
    "stemKey": "IN/IM-",
    "exampleWords": [
      {
        "word": "Inundate",
        "partOfSpeech": "v",
        "meaning": "Làm ngập lụt, tràn ngập thông tin",
        "visualBreakdown": "In- (vào trong) + und (sóng nước) + -ate",
        "ieltsSentence": "Torrential monsoon deluges inundated agrarian lowlands, devastating food staples.",
        "vietnameseTranslation": "Mưa lũ gió mùa xối xả làm ngập lụt các vùng đồng bằng nông nghiệp, tàn phá các loại cây lương thực thiết yếu.",
        "level": "C2",
        "collocation": "Inundate with requests / Severely inundated"
      },
      {
        "word": "Inherent",
        "partOfSpeech": "adj",
        "meaning": "Vốn có, gắn liền bản chất sâu bên trong",
        "visualBreakdown": "In- (bên trong) + her (dính liền) + -ent",
        "ieltsSentence": "Volatility is an inherent characteristic of unregulated speculative capital markets.",
        "vietnameseTranslation": "Sự biến động là một đặc tính vốn có bên trong của các thị trường vốn đầu cơ thiếu kiểm soát.",
        "level": "C1",
        "collocation": "Inherent risk / Inherent flaw"
      },
      {
        "word": "Irreversible",
        "partOfSpeech": "adj",
        "meaning": "Không thể đảo ngược tình thế",
        "visualBreakdown": "Ir- (phủ định) + re- + vers (quay lại) + -ible",
        "ieltsSentence": "Crossing planetary tipping points risks precipitating irreversible ecological collapse.",
        "vietnameseTranslation": "Vượt qua các điểm tới hạn của hành tinh có nguy cơ dẫn tới sự sụp đổ sinh thái không thể đảo ngược.",
        "level": "C1",
        "collocation": "Irreversible damage / Irreversible change"
      },
      {
        "word": "Illiteracy",
        "partOfSpeech": "n",
        "meaning": "Nạn mù chữ, sự thiếu hiểu biết cơ bản",
        "visualBreakdown": "Il- (không) + liter (chữ nghĩa) + -acy",
        "ieltsSentence": "Eradicating adult illiteracy remains fundamental to achieving equitable economic mobility.",
        "vietnameseTranslation": "Xóa nạn mù chữ ở người lớn vẫn là điều cơ bản để đạt được sự dịch chuyển kinh tế bình đẳng.",
        "level": "C1",
        "collocation": "Combat illiteracy / Functional illiteracy"
      },
      {
        "word": "Implicit",
        "partOfSpeech": "adj",
        "meaning": "Ngấm ngầm, ẩn ý hàm chứa bên trong",
        "visualBreakdown": "Im- (vào trong) + plic (gấp nếp) + -it",
        "ieltsSentence": "The proposed statutory amendment contains implicit concessions to corporate lobby groups.",
        "vietnameseTranslation": "Đề xuất sửa đổi luật chứa đựng những nhượng bộ ngầm ẩn ý đối với các nhóm vận động hành lang doanh nghiệp.",
        "level": "C1",
        "collocation": "Implicit assumption / Implicit bias"
      },
      {
        "word": "Incur",
        "partOfSpeech": "v",
        "meaning": "Gánh chịu, chuốc lấy phí tổn/hậu quả",
        "visualBreakdown": "In- (vào trong) + cur (chạy vào)",
        "ieltsSentence": "Firms adopting reckless ecological shortcuts will inevitably incur hefty regulatory penalties.",
        "vietnameseTranslation": "Các công ty áp dụng các đường tắt sinh thái thiếu trách nhiệm chắc chắn sẽ phải gánh chịu những hình phạt nặng nề.",
        "level": "C1",
        "collocation": "Incur debt / Incur expenses"
      },
      {
        "word": "Indigenous",
        "partOfSpeech": "adj",
        "meaning": "Bản địa, sinh ra ngay từ lòng quê hương",
        "visualBreakdown": "Indi- (trong nước) + gen (sinh ra) + -ous",
        "ieltsSentence": "Safeguarding indigenous ecological knowledge reinforces localized forest conservation.",
        "vietnameseTranslation": "Bảo vệ tri thức sinh thái bản địa giúp củng cố việc bảo tồn rừng mang tính địa phương.",
        "level": "C1",
        "collocation": "Indigenous people / Indigenous fauna"
      },
      {
        "word": "Induce",
        "partOfSpeech": "v",
        "meaning": "Dẫn dụ, kích hoạt, gây ra trạng thái",
        "visualBreakdown": "In- (vào trong) + duce (dẫn dắt)",
        "ieltsSentence": "Chronic auditory pollution can induce systemic physiological stress in urban dwellers.",
        "vietnameseTranslation": "Ô nhiễm tiếng ồn kinh niên có thể gây ra căng thẳng sinh lý mang tính hệ thống ở cư dân đô thị.",
        "level": "C1",
        "collocation": "Induce sleep / Chemically induced"
      },
      {
        "word": "Infiltrate",
        "partOfSpeech": "v",
        "meaning": "Thâm nhập ngầm, rò rỉ ngấm vào trong",
        "visualBreakdown": "In- (vào trong) + filtr (màng lọc) + -ate",
        "ieltsSentence": "Subterranean leachates gradually infiltrate vulnerable freshwater aquifers.",
        "vietnameseTranslation": "Nước rỉ rác dưới lòng đất dần dần ngấm ngầm thâm nhập vào các tầng ngậm nước ngọt nhạy cảm.",
        "level": "C1",
        "collocation": "Infiltrate the network / Infiltrate soil"
      },
      {
        "word": "Infringe",
        "partOfSpeech": "v",
        "meaning": "Xâm phạm quyền lợi, vi phạm điều cấm",
        "visualBreakdown": "In- (vào trong) + fringe (bẻ vỡ)",
        "ieltsSentence": "Unauthorized biometric surveillance infringes fundamental constitutional privacy guarantees.",
        "vietnameseTranslation": "Hoạt động giám sát sinh trắc học trái phép xâm phạm các bảo đảm hiến định căn bản về quyền riêng tư.",
        "level": "C2",
        "collocation": "Infringe on rights / Infringe a patent"
      },
      {
        "word": "Ingest",
        "partOfSpeech": "v",
        "meaning": "Ăn vào bụng, nuốt vào cơ thể",
        "visualBreakdown": "In- (vào trong) + gest (mang, vác)",
        "ieltsSentence": "Marine pelagic organisms ingest hazardous microplastic fragments mistaken for plankton.",
        "vietnameseTranslation": "Các sinh vật biển tầng nổi nuốt phải các mảnh vi nhựa nguy hại do nhầm lẫn với sinh vật phù du.",
        "level": "C2",
        "collocation": "Ingest nutrients / Accidentally ingest"
      },
      {
        "word": "Inhabit",
        "partOfSpeech": "v",
        "meaning": "Cư trú, sinh sống bên trong khu vực",
        "visualBreakdown": "In- (trong) + habit (ở, quen thuộc)",
        "ieltsSentence": "Endangered cetaceans inhabit the pristine thermal upwelling corridors off the coast.",
        "vietnameseTranslation": "Các loài cá voi nguy cấp sinh sống bên trong các hành lang nước trồi nhiệt nguyên sơ ngoài khơi.",
        "level": "C1",
        "collocation": "Inhabit a region / Densely inhabited"
      },
      {
        "word": "Initiate",
        "partOfSpeech": "v",
        "meaning": "Khởi xướng, bước đầu đưa vào vận hành",
        "visualBreakdown": "In- (bên trong) + iti (bước đi) + -ate",
        "ieltsSentence": "Municipal leaders initiated a groundbreaking circular recycling scheme.",
        "vietnameseTranslation": "Lãnh đạo đô thị đã khởi xướng một chương trình tái chế tuần hoàn mang tính đột phá.",
        "level": "C1",
        "collocation": "Initiate reform / Initiate dialogue"
      },
      {
        "word": "Innate",
        "partOfSpeech": "adj",
        "meaning": "Bẩm sinh, có sẵn từ trong bản tính",
        "visualBreakdown": "In- (bên trong) + nate (sinh ra)",
        "ieltsSentence": "Human toddlers demonstrate an innate predisposition for linguistic syntax acquisition.",
        "vietnameseTranslation": "Trẻ mới biết đi bộc lộ một thiên hướng bẩm sinh trong việc tiếp thu cú pháp ngôn ngữ.",
        "level": "C1",
        "collocation": "Innate ability / Innate talent"
      },
      {
        "word": "Insolvent",
        "partOfSpeech": "adj",
        "meaning": "Vỡ nợ, mất khả năng thanh toán nợ",
        "visualBreakdown": "In- (không) + solvent (có thể hòa tan, trả nợ)",
        "ieltsSentence": "The retail enterprise was declared insolvent following consecutive quarters of deficit.",
        "vietnameseTranslation": "Doanh nghiệp bán lẻ bị tuyên bố vỡ nợ sau nhiều quý liên tiếp thâm hụt tài chính.",
        "level": "C2",
        "collocation": "Become insolvent / Insolvent firm"
      },
      {
        "word": "Insurmountable",
        "partOfSpeech": "adj",
        "meaning": "Không thể vượt qua nổi trở ngại",
        "visualBreakdown": "In- (không) + surmount (vượt qua) + -able",
        "ieltsSentence": "Logistical bottlenecks presented seemingly insurmountable hurdles to vaccine distribution.",
        "vietnameseTranslation": "Các nút thắt hậu cần đã tạo ra những trở ngại dường như không thể vượt qua đối với việc phân phối vắc-xin.",
        "level": "C2",
        "collocation": "Insurmountable obstacles / Insurmountable challenge"
      },
      {
        "word": "Intangible",
        "partOfSpeech": "adj",
        "meaning": "Phi vật thể, vô hình không sờ nắm được",
        "visualBreakdown": "In- (không) + tang (chạm, sờ) + -ible",
        "ieltsSentence": "Intellectual capital and brand goodwill constitute intangible corporate assets.",
        "vietnameseTranslation": "Vốn trí tuệ và uy tín thương hiệu cấu thành các tài sản doanh nghiệp phi vật thể.",
        "level": "C1",
        "collocation": "Intangible cultural heritage / Intangible benefits"
      },
      {
        "word": "Intervene",
        "partOfSpeech": "v",
        "meaning": "Can thiệp vào giữa để xử lý",
        "visualBreakdown": "Inter- (ở giữa) + vene (đến)",
        "ieltsSentence": "Monetary authorities intervened decisively to stabilize the depreciating currency.",
        "vietnameseTranslation": "Các nhà chức trách tiền tệ đã can thiệp dứt khoát để ổn định đồng tiền đang mất giá.",
        "level": "C1",
        "collocation": "Intervene in a crisis / Militarily intervene"
      },
      {
        "word": "Intimidate",
        "partOfSpeech": "v",
        "meaning": "Đe dọa, làm khiếp sợ",
        "visualBreakdown": "In- (vào trong) + timid (nhút nhát) + -ate",
        "ieltsSentence": "Authoritarian regimes frequently intimidate independent investigative reporters.",
        "vietnameseTranslation": "Các chế độ chuyên chế thường xuyên đe dọa những phóng viên điều tra độc lập.",
        "level": "C1",
        "collocation": "Intimidate witnesses / Feel intimidated"
      },
      {
        "word": "Intricate",
        "partOfSpeech": "adj",
        "meaning": "Tinh xảo, đan kết phức tạp",
        "visualBreakdown": "In- (vào trong) + tric (rối rắm, bẫy) + -ate",
        "ieltsSentence": "Tropical coral reefs harbor an intricate web of symbiotic ecological dependencies.",
        "vietnameseTranslation": "Các rạn san hô nhiệt đới chứa đựng một mạng lưới cộng sinh phụ thuộc sinh thái vô cùng tinh xảo và phức tạp.",
        "level": "C1",
        "collocation": "Intricate design / Intricate network"
      },
      {
        "word": "Invulnerable",
        "partOfSpeech": "adj",
        "meaning": "Bất khả xâm phạm, không thể tổn thương",
        "visualBreakdown": "In- (không) + vulner (tổn thương) + -able",
        "ieltsSentence": "No financial architecture is completely invulnerable to systemic geopolitical shockwaves.",
        "vietnameseTranslation": "Không một cấu trúc tài chính nào là hoàn toàn bất khả xâm phạm trước những cú sốc địa chính trị mang tính hệ thống.",
        "level": "C2",
        "collocation": "Invulnerable to attack / Render invulnerable"
      },
      {
        "word": "Immutable",
        "partOfSpeech": "adj",
        "meaning": "Bất biến, vĩnh viễn không thay đổi",
        "visualBreakdown": "Im- (không) + mut (thay đổi) + -able",
        "ieltsSentence": "Classical physicists regarded spatial and temporal dimensions as immutable absolutes.",
        "vietnameseTranslation": "Các nhà vật lý cổ điển từng coi các chiều không gian và thời gian là những hằng số tuyệt đối bất biến.",
        "level": "C2",
        "collocation": "Immutable law of nature / Immutable truth"
      },
      {
        "word": "Impoverish",
        "partOfSpeech": "v",
        "meaning": "Làm bần cùng hóa, làm kiệt quệ đất đai",
        "visualBreakdown": "Im- (làm cho) + pover (nghèo) + -ish",
        "ieltsSentence": "Extensive chemical pesticide leaching impoverishes microbial fertility in topsoil.",
        "vietnameseTranslation": "Sự rửa trôi thuốc trừ sâu hóa học trên diện rộng làm kiệt quệ độ phì nhiêu của vi sinh vật trong đất mặt.",
        "level": "C2",
        "collocation": "Impoverish soil / Impoverish communities"
      },
      {
        "word": "Incessant",
        "partOfSpeech": "adj",
        "meaning": "Không ngừng nghỉ, liên miên dai dẳng",
        "visualBreakdown": "In- (không) + cess (dừng lại) + -ant",
        "ieltsSentence": "Urban workers suffer cognitive burnout under the pressure of incessant digital notifications.",
        "vietnameseTranslation": "Người lao động đô thị bị kiệt quệ nhận thức dưới áp lực của những thông báo số liên miên không ngừng nghỉ.",
        "level": "C2",
        "collocation": "Incessant noise / Incessant rain"
      },
      {
        "word": "Imminent",
        "partOfSpeech": "adj",
        "meaning": "Sắp sửa ập đến, cận kề trước mắt",
        "visualBreakdown": "Im- (trên) + min (nhô ra) + -ent",
        "ieltsSentence": "Meteorologists broadcast warnings concerning the imminent arrival of a typhoon.",
        "vietnameseTranslation": "Các nhà khí tượng học phát đi cảnh báo về việc siêu bão sắp sửa ập đến cận kề.",
        "level": "C1",
        "collocation": "Imminent danger / Imminent collapse"
      }
    ]
  },
  {
    "id": "stem-sub-hypo",
    "root": "SUB/HYPO/UNDER-",
    "meaning": "Nằm bên dưới nền tảng, tiềm ẩn, thứ cấp",
    "origin": "Tiền tố Latin (sub-) & Hy Lạp (hypo-)",
    "description": "Chỉ vị trí ở tầng sâu hơn, làm bệ phóng nền tảng cốt lõi, hoặc mức độ hạ thấp hơn so với thang đo quy chuẩn.",
    "tip": "Nhớ đến Subway (xe điện ngầm dưới lòng đất) hoặc Hypothermia (hạ thân nhiệt) – vị trí hoặc cấp độ luôn ở bên dưới.",
    "category": "Trục 1: Tiền Tố Định Hướng & Biến Đổi",
    "axis": "Trục 1",
    "axisTitle": "TRỤC 1: TIỀN TỐ ĐỊNH HƯỚNG & BIẾN ĐỔI",
    "axisSubtitle": "Action & Vector (Gắn kết & Tác động)",
    "stemKey": "SUB/HYPO-",
    "exampleWords": [
      {
        "word": "Hypothesis",
        "partOfSpeech": "n",
        "meaning": "Giả thuyết khoa học làm nền tảng kiểm chứng",
        "visualBreakdown": "Hypo- (bên dưới) + thesis (đặt ra)",
        "ieltsSentence": "Rigorous experimental verification is necessary to substantiate the researcher's hypothesis.",
        "vietnameseTranslation": "Việc kiểm chứng thực nghiệm nghiêm ngặt là điều bắt buộc để chứng minh giả thuyết của nhà nghiên cứu.",
        "level": "C1",
        "collocation": "Formulate a hypothesis / Test a hypothesis"
      },
      {
        "word": "Subsidize",
        "partOfSpeech": "v",
        "meaning": "Trợ cấp giá, rót ngân sách hỗ trợ",
        "visualBreakdown": "Sub- (bên dưới) + sid (ngồi, trợ giúp) + -ize",
        "ieltsSentence": "Governmental agencies subsidize solar panel adoption to hasten renewable transition.",
        "vietnameseTranslation": "Các cơ quan chính phủ trợ cấp việc sử dụng pin năng lượng mặt trời để thúc đẩy quá trình chuyển đổi năng lượng tái tạo.",
        "level": "C1",
        "collocation": "Heavily subsidize / Subsidize public transit"
      },
      {
        "word": "Subsequent",
        "partOfSpeech": "adj",
        "meaning": "Xảy ra nối tiếp theo sau đó",
        "visualBreakdown": "Sub- (theo sau dưới) + sequ (đi theo) + -ent",
        "ieltsSentence": "The initial discovery spurred subsequent breakthroughs across pharmacological biology.",
        "vietnameseTranslation": "Phát hiện ban đầu đã thúc đẩy những đột phá tiếp sau đó trên khắp lĩnh vực sinh học dược lý.",
        "level": "C1",
        "collocation": "Subsequent generations / Subsequent investigations"
      },
      {
        "word": "Undergraduate",
        "partOfSpeech": "n",
        "meaning": "Sinh viên bậc đại học cử nhân",
        "visualBreakdown": "Under- (dưới) + graduate (tốt nghiệp)",
        "ieltsSentence": "Undergraduate curricula increasingly incorporate hands-on data science modules.",
        "vietnameseTranslation": "Chương trình giảng dạy bậc đại học ngày càng tích hợp các học phần khoa học dữ liệu thực hành.",
        "level": "C1",
        "collocation": "Undergraduate degree / Undergraduate student"
      },
      {
        "word": "Subconscious",
        "partOfSpeech": "n",
        "meaning": "Tiềm thức, vùng nhận thức nằm dưới ý thức",
        "visualBreakdown": "Sub- (dưới) + conscious (ý thức)",
        "ieltsSentence": "Subconscious perceptual cues heavily influence consumer purchasing trajectories.",
        "vietnameseTranslation": "Những tín hiệu tri giác trong tiềm thức ảnh hưởng rất lớn đến quỹ đạo mua sắm của người tiêu dùng.",
        "level": "C1",
        "collocation": "Subconscious mind / Subconscious desire"
      },
      {
        "word": "Subdue",
        "partOfSpeech": "v",
        "meaning": "Áp chế, dẹp yên, chế ngự dưới quyền",
        "visualBreakdown": "Sub- (dưới) + due (dẫn dắt)",
        "ieltsSentence": "Aggressive central banking interventions subdued runaway financial market panic.",
        "vietnameseTranslation": "Sự can thiệp quyết liệt của ngân hàng trung ương đã dẹp yên nỗi hoảng loạn trên thị trường tài chính.",
        "level": "C2",
        "collocation": "Subdue inflation / Subdue the rebellion"
      },
      {
        "word": "Subjugate",
        "partOfSpeech": "v",
        "meaning": "Khuất phục, biến thành nô dịch/thuộc địa",
        "visualBreakdown": "Sub- (dưới) + jug (cái ách nô lệ) + -ate",
        "ieltsSentence": "Imperial powers historically deployed military dominance to subjugate sovereign peoples.",
        "vietnameseTranslation": "Các cường quốc đế quốc trước đây từng sử dụng ưu thế quân sự để khuất phục các dân tộc có chủ quyền.",
        "level": "C2",
        "collocation": "Subjugate nations / Total subjugation"
      },
      {
        "word": "Subliminal",
        "partOfSpeech": "adj",
        "meaning": "Dưới ngưỡng ý thức, tác động ngầm tiềm ẩn",
        "visualBreakdown": "Sub- (dưới) + limin (ngưỡng cảm giác) + -al",
        "ieltsSentence": "Advertisers utilize subliminal audio-visual cues to evoke brand allegiance.",
        "vietnameseTranslation": "Các nhà quảng cáo sử dụng các gợi ý nghe nhìn dưới ngưỡng ý thức để khơi gợi lòng trung thành thương hiệu.",
        "level": "C2",
        "collocation": "Subliminal message / Subliminal perception"
      },
      {
        "word": "Submerge",
        "partOfSpeech": "v",
        "meaning": "Dìm xuống dưới mặt nước, nhấn chìm",
        "visualBreakdown": "Sub- (dưới) + merge (nhúng lặn)",
        "ieltsSentence": "Accelerating sea level rise threatens to permanently submerge low-lying archipelagos.",
        "vietnameseTranslation": "Mực nước biển dâng nhanh đe dọa sẽ nhấn chìm vĩnh viễn các quần đảo trũng thấp.",
        "level": "C1",
        "collocation": "Submerged beneath water / Completely submerge"
      },
      {
        "word": "Submissive",
        "partOfSpeech": "adj",
        "meaning": "Phục tùng, cam chịu ở thế chiếu dưới",
        "visualBreakdown": "Sub- (dưới) + miss (gửi, nhượng bộ) + -ive",
        "ieltsSentence": "Feudal social compacts demanded submissive compliance from tenant agriculturalists.",
        "vietnameseTranslation": "Khế ước xã hội phong kiến đòi hỏi sự tuân phục cam chịu từ những nông dân làm thuê.",
        "level": "C1",
        "collocation": "Submissive posture / Remain submissive"
      },
      {
        "word": "Subordinate",
        "partOfSpeech": "adj",
        "meaning": "Cấp dưới, phụ thuộc vào thẩm quyền lớn hơn",
        "visualBreakdown": "Sub- (dưới) + ordin (trật tự, hàng ngũ) + -ate",
        "ieltsSentence": "Regional bylaws remain subordinate to national constitutional provisions.",
        "vietnameseTranslation": "Các quy chế địa phương vẫn phải phụ thuộc và xếp dưới các điều khoản hiến pháp quốc gia.",
        "level": "C1",
        "collocation": "Subordinate role / Subordinate clause"
      },
      {
        "word": "Subservient",
        "partOfSpeech": "adj",
        "meaning": "Khúm núm quỵ lụy, phục tùng mù quáng",
        "visualBreakdown": "Sub- (dưới) + servi (phục vụ) + -ent",
        "ieltsSentence": "Judicial independence is fatally compromised when courts become subservient to executive fiat.",
        "vietnameseTranslation": "Sự độc lập tư pháp sẽ bị tổn hại nghiêm trọng khi các tòa án trở nên khúm núm phục tùng mệnh lệnh hành pháp.",
        "level": "C2",
        "collocation": "Subservient to authority / Refuse to be subservient"
      },
      {
        "word": "Subside",
        "partOfSpeech": "v",
        "meaning": "Lắng xuống đáy, giảm bớt cường độ",
        "visualBreakdown": "Sub- (dưới) + side (ngồi, chìm)",
        "ieltsSentence": "Coastal floodwaters gradually subsided following the departure of the low-pressure system.",
        "vietnameseTranslation": "Nước lũ ven biển dần lắng xuống sau khi hệ thống áp thấp tan đi.",
        "level": "C1",
        "collocation": "Violence subsided / Waters subside"
      },
      {
        "word": "Subsidiary",
        "partOfSpeech": "n",
        "meaning": "Công ty con phụ thuộc vào tập đoàn mẹ",
        "visualBreakdown": "Sub- (dưới) + sidi (ngồi phụ tá) + -ary",
        "ieltsSentence": "The transnational corporation registered a regional subsidiary to manage Asian supply logistics.",
        "vietnameseTranslation": "Tập đoàn xuyên quốc gia đã đăng ký một công ty con khu vực để quản lý hậu cần chuỗi cung ứng châu Á.",
        "level": "C1",
        "collocation": "Wholly owned subsidiary / Subsidiary company"
      },
      {
        "word": "Substantive",
        "partOfSpeech": "adj",
        "meaning": "Có thực chất, quan trọng cốt lõi",
        "visualBreakdown": "Sub- (dưới) + stant (đứng vững) + -ive",
        "ieltsSentence": "Diplomats failed to achieve substantive progress regarding nuclear non-proliferation treaties.",
        "vietnameseTranslation": "Các nhà ngoại giao đã không đạt được tiến triển thực chất nào liên quan đến các hiệp ước không phổ biến vũ khí hạt nhân.",
        "level": "C2",
        "collocation": "Substantive discussion / Substantive evidence"
      },
      {
        "word": "Subsume",
        "partOfSpeech": "v",
        "meaning": "Gộp vào, xếp vào nhóm bao trùm lớn hơn",
        "visualBreakdown": "Sub- (dưới) + sume (lấy, gom)",
        "ieltsSentence": "Local craft guilds were progressively subsumed under industrial conglomerate syndicates.",
        "vietnameseTranslation": "Các phường hội thủ công địa phương dần dần bị gộp vào dưới trướng các tập đoàn công nghiệp lớn.",
        "level": "C2",
        "collocation": "Subsumed under a broader category / Subsume individual interests"
      },
      {
        "word": "Subterfuge",
        "partOfSpeech": "n",
        "meaning": "Kế ngụy trang che giấu ý đồ, quỷ kế",
        "visualBreakdown": "Sub- (dưới) + ter + fuge (chạy trốn)",
        "ieltsSentence": "Corporate cartels employed financial subterfuge to conceal offshore tax avoidance.",
        "vietnameseTranslation": "Các tập đoàn cấu kết đã sử dụng quỷ kế tài chính để che giấu hành vi trốn thuế ở nước ngoài.",
        "level": "C2",
        "collocation": "Resort to subterfuge / Elaborate subterfuge"
      },
      {
        "word": "Subversive",
        "partOfSpeech": "adj",
        "meaning": "Có tính lật đổ thể chế từ chân móng",
        "visualBreakdown": "Sub- (dưới) + vers (lật úp) + -ive",
        "ieltsSentence": "Clandestine publications were deemed subversive by the ruling autocratic junta.",
        "vietnameseTranslation": "Các ấn phẩm bí mật bị chính quyền quân sự chuyên chế coi là có tính chất lật đổ.",
        "level": "C2",
        "collocation": "Subversive elements / Subversive activities"
      },
      {
        "word": "Hypocrisy",
        "partOfSpeech": "n",
        "meaning": "Đạo đức giả, che giấu tâm địa xấu xa",
        "visualBreakdown": "Hypo- (bên dưới) + crisy (phán xét đóng kịch)",
        "ieltsSentence": "Critics denounced political hypocrisy regarding fossil fuel subsidies during climate summits.",
        "vietnameseTranslation": "Các nhà phê bình đã lên án thói đạo đức giả chính trị liên quan đến trợ cấp nhiên liệu hóa thạch tại các hội nghị khí hậu.",
        "level": "C1",
        "collocation": "Sheer hypocrisy / Condemn hypocrisy"
      },
      {
        "word": "Hypothetical",
        "partOfSpeech": "adj",
        "meaning": "Mang tính giả định, trên lý thuyết",
        "visualBreakdown": "Hypo- + thet (đặt để) + -ical",
        "ieltsSentence": "Economic analysts construct hypothetical stress-test scenarios to evaluate liquidity resilience.",
        "vietnameseTranslation": "Các nhà phân tích kinh tế xây dựng các kịch bản kiểm tra sức chịu đựng giả định để đánh giá khả năng thanh khoản.",
        "level": "C1",
        "collocation": "Hypothetical question / Hypothetical scenario"
      },
      {
        "word": "Underestimate",
        "partOfSpeech": "v",
        "meaning": "Đánh giá thấp hơn mức thực tế",
        "visualBreakdown": "Under- (dưới) + estimate (ước lượng)",
        "ieltsSentence": "Policy planners chronically underestimate the fiscal costs of climate-induced infrastructural repair.",
        "vietnameseTranslation": "Các nhà hoạch định chính sách thường xuyên đánh giá thấp chi phí tài chính cho việc sửa chữa cơ sở hạ tầng do khí hậu gây ra.",
        "level": "C1",
        "collocation": "Grossly underestimate / Never underestimate"
      },
      {
        "word": "Undermine",
        "partOfSpeech": "v",
        "meaning": "Đào mòn chân móng, làm suy yếu dần dần",
        "visualBreakdown": "Under- (dưới) + mine (đào mỏ hầm)",
        "ieltsSentence": "Rampant disinformation campaigns deliberately undermine public faith in empirical science.",
        "vietnameseTranslation": "Các chiến dịch thông tin sai lệch tràn lan cố tình đào mòn niềm tin của công chúng vào khoa học thực nghiệm.",
        "level": "C1",
        "collocation": "Undermine confidence / Undermine authority"
      },
      {
        "word": "Underpin",
        "partOfSpeech": "v",
        "meaning": "Chống đỡ, làm điểm tựa nền móng cốt yếu",
        "visualBreakdown": "Under- (dưới) + pin (cột trụ đỡ)",
        "ieltsSentence": "Robust statistical sampling underpins the validity of epidemiological findings.",
        "vietnameseTranslation": "Phương pháp lấy mẫu thống kê vững chắc làm điểm tựa củng cố tính xác thực của các phát hiện dịch tễ học.",
        "level": "C1",
        "collocation": "Underpin economic growth / Theories that underpin"
      },
      {
        "word": "Undertake",
        "partOfSpeech": "v",
        "meaning": "Đảm nhận, dấn thân gánh vác trọng trách",
        "visualBreakdown": "Under- (dưới) + take (nhận lấy)",
        "ieltsSentence": "The municipal authority undertook a massive modernization of wastewater treatment works.",
        "vietnameseTranslation": "Chính quyền đô thị đã đảm nhận việc hiện đại hóa quy mô lớn các công trình xử lý nước thải.",
        "level": "C1",
        "collocation": "Undertake a task / Undertake research"
      },
      {
        "word": "Understate",
        "partOfSpeech": "v",
        "meaning": "Nói giảm nhẹ, giảm bớt tầm nghiêm trọng",
        "visualBreakdown": "Under- (dưới) + state (tuyên bố)",
        "ieltsSentence": "Official mortality statistics noticeably understate the full human toll of the pandemic.",
        "vietnameseTranslation": "Các số liệu thống kê tỷ lệ tử vong chính thức rõ ràng đã nói giảm nhẹ tổng thiệt hại nhân mạng của đại dịch.",
        "level": "C1",
        "collocation": "Cannot be understated / Understate the gravity"
      }
    ]
  },
  {
    "id": "stem-cogn-sci",
    "root": "COGN/SCI-",
    "meaning": "Biết, tư duy, nhận thức não bộ, khoa học",
    "origin": "Gốc Latin (cognoscere: biết, scire: hiểu biết)",
    "description": "Trung tâm của hoạt động trí tuệ, khả năng tiếp nhận, xử lý thông tin và tích lũy tri thức của con người.",
    "tip": "Nhớ đến Recognize (nhận ra) và Science (khoa học) – đều xuất phát từ việc tìm hiểu và nhận biết chân lý.",
    "category": "Trục 2: Tri Thức, Nhận Thức & Diễn Ngôn",
    "axis": "Trục 2",
    "axisTitle": "TRỤC 2: TRI THỨC, NHẬN THỨC & DIỄN NGÔN",
    "axisSubtitle": "Mind & Discourse (Tư duy & Ngôn ngữ)",
    "stemKey": "COGN/SCI-",
    "exampleWords": [
      {
        "word": "Cognitive",
        "partOfSpeech": "adj",
        "meaning": "Thuộc về nhận thức, tư duy trí tuệ",
        "visualBreakdown": "Cogn- (biết) + -itive",
        "ieltsSentence": "Early bilingual exposure fosters superior cognitive flexibility and abstract problem-solving.",
        "vietnameseTranslation": "Tiếp xúc song ngữ sớm nuôi dưỡng sự linh hoạt trong nhận thức và giải quyết vấn đề trừu tượng vượt trội.",
        "level": "C1",
        "collocation": "Cognitive development / Cognitive impairment"
      },
      {
        "word": "Conscientious",
        "partOfSpeech": "adj",
        "meaning": "Tận tâm, chu đáo, có lương tâm nghề nghiệp",
        "visualBreakdown": "Con- + sci- (biết rõ lương tâm) + -entious",
        "ieltsSentence": "Conscientious laboratory practices ensure rigorous replication of experimental protocols.",
        "vietnameseTranslation": "Các thực hành phòng thí nghiệm chu đáo tận tâm đảm bảo việc tái tạo chuẩn xác các quy trình thực nghiệm.",
        "level": "C1",
        "collocation": "Conscientious student / Conscientious objection"
      },
      {
        "word": "Omniscient",
        "partOfSpeech": "adj",
        "meaning": "Toàn tri, thông suốt mọi điều trên đời",
        "visualBreakdown": "Omni- (tất cả) + sci- (biết) + -ent",
        "ieltsSentence": "Nineteenth-century novels frequently employ an omniscient third-person narrator.",
        "vietnameseTranslation": "Tiểu thuyết thế kỷ 19 thường xuyên sử dụng người kể chuyện ngôi thứ ba toàn tri.",
        "level": "C2",
        "collocation": "Omniscient narrator / Omniscient deity"
      },
      {
        "word": "Prescient",
        "partOfSpeech": "adj",
        "meaning": "Biết trước tương lai, tiên tri sáng suốt",
        "visualBreakdown": "Pre- (trước) + sci- (biết) + -ent",
        "ieltsSentence": "The economist delivered a prescient forecast regarding sovereign debt defaults.",
        "vietnameseTranslation": "Nhà kinh tế học đã đưa ra một dự báo có tầm nhìn thấu suốt biết trước về các vụ vỡ nợ công.",
        "level": "C2",
        "collocation": "Prescient warning / Remarkably prescient"
      },
      {
        "word": "Cognizant",
        "partOfSpeech": "adj",
        "meaning": "Có ý thức nhận biết rõ ràng về điều gì",
        "visualBreakdown": "Cogn- (biết) + -izant",
        "ieltsSentence": "Administrators must remain fully cognizant of subtle algorithmic biases in recruitment software.",
        "vietnameseTranslation": "Các nhà quản trị phải luôn nhận thức đầy đủ về những thiên kiến thuật toán tinh vi trong phần mềm tuyển dụng.",
        "level": "C2",
        "collocation": "Cognizant of the fact / Fully cognizant"
      },
      {
        "word": "Consciousness",
        "partOfSpeech": "n",
        "meaning": "Ý thức, trạng thái tỉnh táo nhận thức",
        "visualBreakdown": "Con- + sci- (biết) + -ous + -ness",
        "ieltsSentence": "Neuroscientists study neural correlates underpinning subjective human consciousness.",
        "vietnameseTranslation": "Các nhà thần kinh học nghiên cứu các mối tương quan thần kinh củng cố ý thức chủ quan của con người.",
        "level": "C1",
        "collocation": "Raise consciousness / Lose consciousness"
      },
      {
        "word": "Unconscionable",
        "partOfSpeech": "adj",
        "meaning": "Vô lương tâm, phi đạo đức không thể chấp nhận",
        "visualBreakdown": "Un- (không) + consci (lương tâm) + -onable",
        "ieltsSentence": "Profiteering during severe pharmaceutical shortages was condemned as unconscionable.",
        "vietnameseTranslation": "Hành vi trục lợi trong thời kỳ thiếu hụt dược phẩm nghiêm trọng bị lên án là vô lương tâm.",
        "level": "C2",
        "collocation": "Unconscionable behavior / Unconscionable delay"
      },
      {
        "word": "Incognito",
        "partOfSpeech": "adv",
        "meaning": "Ẩn danh, giấu tung tích không cho ai biết",
        "visualBreakdown": "In- (không) + cognit (biết) + -o",
        "ieltsSentence": "The visiting inspector traveled incognito to evaluate municipal welfare centers impartially.",
        "vietnameseTranslation": "Thanh tra viếng thăm đã đi ẩn danh để đánh giá các trung tâm phúc lợi công cộng một cách vô tư.",
        "level": "C2",
        "collocation": "Travel incognito / Live incognito"
      },
      {
        "word": "Recognize",
        "partOfSpeech": "v",
        "meaning": "Nhận ra, công nhận chính thức giá trị",
        "visualBreakdown": "Re- (lại) + cogn (biết) + -ize",
        "ieltsSentence": "Global institutions must formally recognize indigenous stewardship over ancestral lands.",
        "vietnameseTranslation": "Các tổ chức toàn cầu phải chính thức công nhận quyền quản lý của người bản địa đối với đất đai tổ tiên.",
        "level": "C1",
        "collocation": "Formally recognize / Internationally recognized"
      },
      {
        "word": "Precognition",
        "partOfSpeech": "n",
        "meaning": "Khả năng linh cảm biết trước tương lai",
        "visualBreakdown": "Pre- (trước) + cognit (biết) + -ion",
        "ieltsSentence": "Parapsychological claims of precognition fail to withstand empirical reproducibility tests.",
        "vietnameseTranslation": "Những tuyên bố ngoại cảm về khả năng biết trước tương lai đã không đứng vững trước các thử nghiệm tái tạo thực nghiệm.",
        "level": "C2",
        "collocation": "Claims of precognition / Eerie precognition"
      },
      {
        "word": "Scientific",
        "partOfSpeech": "adj",
        "meaning": "Mang tính khoa học chuẩn xác",
        "visualBreakdown": "Sci- (biết) + fic (làm ra) + -ic",
        "ieltsSentence": "Peer-reviewed publication forms the bedrock of credible scientific consensus.",
        "vietnameseTranslation": "Xuất bản có phản biện kín cấu thành nền tảng của sự đồng thuận khoa học đáng tin cậy.",
        "level": "C1",
        "collocation": "Scientific inquiry / Scientific method"
      },
      {
        "word": "Sciolism",
        "partOfSpeech": "n",
        "meaning": "Thói tỏ ra thông thái nửa mùa, nông cạn",
        "visualBreakdown": "Sci- (biết) + -ol + -ism",
        "ieltsSentence": "Pseudoscience blogs propagate superficial sciolism disguised as authoritative health advice.",
        "vietnameseTranslation": "Các trang blog ngụy khoa học lan truyền tri thức nửa mùa nông cạn đội lốt lời khuyên sức khỏe có thẩm quyền.",
        "level": "C2",
        "collocation": "Superficial sciolism / Condemn sciolism"
      },
      {
        "word": "Nescience",
        "partOfSpeech": "n",
        "meaning": "Sự vô tri, hoàn toàn không có hiểu biết",
        "visualBreakdown": "Ne- (không) + sci- (biết) + -ence",
        "ieltsSentence": "Historical nescience regarding climate feedback loops precipitated reckless deforestation.",
        "vietnameseTranslation": "Sự vô tri trong quá khứ liên quan đến các vòng phản hồi khí hậu đã thúc đẩy nạn phá rừng liều lĩnh.",
        "level": "C2",
        "collocation": "Total nescience / Confess nescience"
      },
      {
        "word": "Plebiscite",
        "partOfSpeech": "n",
        "meaning": "Trưng cầu dân ý để toàn dân quyết định",
        "visualBreakdown": "Plebi (dân chúng) + scite (biết, quyết định)",
        "ieltsSentence": "The constitutional referendum was ratified following a peaceful nationwide plebiscite.",
        "vietnameseTranslation": "Cuộc trưng cầu ý dân về hiến pháp đã được phê chuẩn sau một cuộc bỏ phiếu toàn quốc hòa bình.",
        "level": "C2",
        "collocation": "Hold a plebiscite / Nationwide plebiscite"
      },
      {
        "word": "Cognition",
        "partOfSpeech": "n",
        "meaning": "Quá trình nhận thức và suy nghĩ",
        "visualBreakdown": "Cogn- (biết) + -ition",
        "ieltsSentence": "Nutritional deficiencies during infancy impede optimal neurological cognition.",
        "vietnameseTranslation": "Thiếu hụt dinh dưỡng trong thời kỳ sơ sinh cản trở quá trình nhận thức thần kinh tối ưu.",
        "level": "C1",
        "collocation": "Human cognition / Social cognition"
      },
      {
        "word": "Metacognition",
        "partOfSpeech": "n",
        "meaning": "Siêu nhận thức, khả năng tự ý thức về suy nghĩ",
        "visualBreakdown": "Meta- (vượt lên) + cognit (biết) + -ion",
        "ieltsSentence": "Developing metacognition enables self-directed scholars to diagnose their conceptual lacunae.",
        "vietnameseTranslation": "Phát triển siêu nhận thức cho phép người học tự định hướng chẩn đoán các lỗ hổng khái niệm của mình.",
        "level": "C2",
        "collocation": "Metacognitive strategies / Fosters metacognition"
      },
      {
        "word": "Cognoscente",
        "partOfSpeech": "n",
        "meaning": "Chuyên gia sành sỏi, bậc thầy thưởng thức",
        "visualBreakdown": "Cogn- (biết) + -oscente",
        "ieltsSentence": "The classical violinist captivated both casual listeners and exacting cognoscenti.",
        "vietnameseTranslation": "Nghệ sĩ vĩ cầm cổ điển đã mê hoặc cả người nghe thông thường lẫn các chuyên gia thẩm âm sành sỏi khó tính.",
        "level": "C2",
        "collocation": "Art cognoscenti / Musical cognoscenti"
      },
      {
        "word": "Agnostic",
        "partOfSpeech": "n",
        "meaning": "Người theo thuyết bất khả tri",
        "visualBreakdown": "A- (không) + gnost (biết) + -ic",
        "ieltsSentence": "He adopted an agnostic perspective concerning speculative metaphysical assertions.",
        "vietnameseTranslation": "Ông đã áp dụng một góc nhìn bất khả tri liên quan đến các khẳng định siêu hình học mang tính suy đoán.",
        "level": "C2",
        "collocation": "Agnostic view / Remain agnostic"
      },
      {
        "word": "Prognosis",
        "partOfSpeech": "n",
        "meaning": "Tiên lượng diễn biến bệnh/tình hình",
        "visualBreakdown": "Pro- (trước) + gnosis (biết)",
        "ieltsSentence": "Early oncological detection dramatically improves long-term clinical prognosis.",
        "vietnameseTranslation": "Phát hiện ung bướu sớm giúp cải thiện đáng kể tiên lượng lâm sàng dài hạn.",
        "level": "C1",
        "collocation": "Favorable prognosis / Economic prognosis"
      },
      {
        "word": "Diagnosis",
        "partOfSpeech": "n",
        "meaning": "Chẩn đoán bệnh lý hoặc nguyên nhân gốc rễ",
        "visualBreakdown": "Dia- (xuyên qua) + gnosis (biết)",
        "ieltsSentence": "Accurate differential diagnosis prevents hazardous therapeutic misadventures.",
        "vietnameseTranslation": "Chẩn đoán phân biệt chính xác giúp ngăn ngừa những rủi ro trị liệu nguy hại.",
        "level": "C1",
        "collocation": "Early diagnosis / Confirm a diagnosis"
      },
      {
        "word": "Gnosticism",
        "partOfSpeech": "n",
        "meaning": "Thuyết ngộ tri, coi tri thức thần bí cứu rỗi",
        "visualBreakdown": "Gnost (biết) + -ic + -ism",
        "ieltsSentence": "Scholars of antiquity re-examined ancient Gnosticism to decode esoteric religious rites.",
        "vietnameseTranslation": "Các học giả cổ đại đã xem xét lại thuyết ngộ tri cổ xưa để giải mã các nghi lễ tôn giáo huyền bí.",
        "level": "C2",
        "collocation": "Ancient Gnosticism / Gnostic philosophy"
      },
      {
        "word": "Subconscious",
        "partOfSpeech": "adj",
        "meaning": "Thuộc về tiềm thức dưới tầng nhận biết",
        "visualBreakdown": "Sub- (dưới) + conscious (nhận biết)",
        "ieltsSentence": "Visual branding triggers subconscious neural associations with comfort and safety.",
        "vietnameseTranslation": "Xây dựng thương hiệu thị giác kích hoạt các liên tưởng thần kinh trong tiềm thức về sự thoải mái và an toàn.",
        "level": "C1",
        "collocation": "Subconscious mind / Subconscious reaction"
      },
      {
        "word": "Conscience",
        "partOfSpeech": "n",
        "meaning": "Lương tâm, tiếng nói phán xét nội tâm",
        "visualBreakdown": "Con- + science (sự biết bên trong)",
        "ieltsSentence": "Whistleblowers are often impelled by individual conscience to unmask institutional fraud.",
        "vietnameseTranslation": "Những người tố giác thường bị thúc đẩy bởi lương tâm cá nhân để vạch trần gian lận thể chế.",
        "level": "C1",
        "collocation": "Guilty conscience / Clear conscience"
      },
      {
        "word": "Scire facias",
        "partOfSpeech": "n",
        "meaning": "Lệnh tư pháp triệu tập kiểm tra hồ sơ",
        "visualBreakdown": "Scire (biết) + facias (hãy làm)",
        "ieltsSentence": "The appellate magistrate issued a writ of scire facias to examine patent enforceability.",
        "vietnameseTranslation": "Thẩm phán phúc thẩm đã ban hành lệnh tư pháp để kiểm tra khả năng thực thi bằng sáng chế.",
        "level": "C2",
        "collocation": "Writ of scire facias / Judicial proceeding"
      },
      {
        "word": "Intercognition",
        "partOfSpeech": "n",
        "meaning": "Sự giao thoa nhận thức chung đa ngành",
        "visualBreakdown": "Inter- (giữa) + cognit (biết) + -ion",
        "ieltsSentence": "Intercognition among neurobiologists and roboticists accelerates human-machine interface design.",
        "vietnameseTranslation": "Sự giao thoa nhận thức giữa các nhà sinh học thần kinh và chế tạo robot đẩy nhanh thiết kế giao diện người-máy.",
        "level": "C2",
        "collocation": "Foster intercognition / Academic intercognition"
      }
    ]
  },
  {
    "id": "stem-dict-voc-loq",
    "root": "DICT/VOC/LOQ-",
    "meaning": "Phát ngôn, tiếng nói, tuyên bố, diễn ngôn",
    "origin": "Gốc Latin (dicere: nói, vocare: gọi tiếng, loqui: trò chuyện)",
    "description": "Các gốc từ chủ đạo biểu đạt khả năng truyền tải thông điệp, tranh luận, hiệu triệu hoặc thiết lập luật định bằng lời nói.",
    "tip": "Nhớ đến Predict (nói trước), Vocal (giọng hát), Eloquent (hùng biện lưu loát) – đều liên quan đến ngôn từ.",
    "category": "Trục 2: Tri Thức, Nhận Thức & Diễn Ngôn",
    "axis": "Trục 2",
    "axisTitle": "TRỤC 2: TRI THỨC, NHẬN THỨC & DIỄN NGÔN",
    "axisSubtitle": "Mind & Discourse (Tư duy & Ngôn ngữ)",
    "stemKey": "DICT/VOC/LOQ-",
    "exampleWords": [
      {
        "word": "Contradict",
        "partOfSpeech": "v",
        "meaning": "Mâu thuẫn, nói ngược lại với sự thật/khẳng định",
        "visualBreakdown": "Contra- (chống lại) + dict (nói)",
        "ieltsSentence": "Empirical field observations directly contradict the preliminary mathematical simulations.",
        "vietnameseTranslation": "Các quan sát thực địa trực tiếp mâu thuẫn trái ngược với các mô phỏng toán học sơ bộ.",
        "level": "C1",
        "collocation": "Directly contradict / Contradict each other"
      },
      {
        "word": "Dictate",
        "partOfSpeech": "v",
        "meaning": "Chi phối, quyết định quy luật, áp đặt",
        "visualBreakdown": "Dict- (nói ra) + -ate",
        "ieltsSentence": "Ecological carrying capacity must dictate the intensity of coastal land development.",
        "vietnameseTranslation": "Sức chứa sinh thái phải chi phối và quyết định mức độ phát triển đất đai ven biển.",
        "level": "C1",
        "collocation": "Dictate policy / Dictate terms"
      },
      {
        "word": "Verdict",
        "partOfSpeech": "n",
        "meaning": "Phán quyết chính thức của tòa án/dư luận",
        "visualBreakdown": "Ver (chân lý) + dict (nói)",
        "ieltsSentence": "The unanimous judicial verdict mandated compensation for aggrieved landowners.",
        "vietnameseTranslation": "Phán quyết nhất trí của tòa án đã bắt buộc bồi thường cho những chủ đất bị thiệt hại.",
        "level": "C1",
        "collocation": "Reach a verdict / Deliver a verdict"
      },
      {
        "word": "Vindicate",
        "partOfSpeech": "v",
        "meaning": "Minh chứng tính đúng đắn, xóa tan nghi ngờ",
        "visualBreakdown": "Vin- (lực bảo vệ) + dic (nói) + -ate",
        "ieltsSentence": "Longitudinal epidemiological data vindicated the health ministry's early inoculation campaign.",
        "vietnameseTranslation": "Dữ liệu dịch tễ học theo chiều dọc đã minh chứng tính đúng đắn cho chiến dịch tiêm chủng sớm của bộ y tế.",
        "level": "C2",
        "collocation": "Vindicate claims / Fully vindicated"
      },
      {
        "word": "Advocate",
        "partOfSpeech": "v",
        "meaning": "Chủ trương ủng hộ công khai, vận động cho",
        "visualBreakdown": "Ad- (hướng tới) + voc (lên tiếng) + -ate",
        "ieltsSentence": "Leading sociologists advocate universal basic income to mitigate automation unemployment.",
        "vietnameseTranslation": "Các nhà xã hội học hàng đầu chủ trương ủng hộ thu nhập cơ bản phổ quát để giảm bớt thất nghiệp do tự động hóa.",
        "level": "C1",
        "collocation": "Fiercely advocate / Advocate reform"
      },
      {
        "word": "Evocative",
        "partOfSpeech": "adj",
        "meaning": "Gợi cảm, khơi dậy nhiều liên tưởng sâu sắc",
        "visualBreakdown": "E- (ra ngoài) + voc (gọi tiếng) + -ative",
        "ieltsSentence": "The documentary incorporates evocative archival footage of post-war reconstruction.",
        "vietnameseTranslation": "Bộ phim tài liệu lồng ghép các cảnh quay lưu trữ gợi cảm đầy ấn tượng về thời kỳ tái thiết sau chiến tranh.",
        "level": "C1",
        "collocation": "Evocative imagery / Deeply evocative"
      },
      {
        "word": "Equivocal",
        "partOfSpeech": "adj",
        "meaning": "Mập mờ hai nghĩa, không rõ ràng dứt khoát",
        "visualBreakdown": "Equi- (ngang bằng) + voc (tiếng nói) + -al",
        "ieltsSentence": "The spokesperson's equivocal replies regarding nuclear deterrence prompted diplomatic anxiety.",
        "vietnameseTranslation": "Những câu trả lời mập mờ nước đôi của người phát ngôn về răn đe hạt nhân đã làm dấy lên sự lo ngại ngoại giao.",
        "level": "C2",
        "collocation": "Equivocal response / Remain equivocal"
      },
      {
        "word": "Provocative",
        "partOfSpeech": "adj",
        "meaning": "Kích động tranh luận, khêu gợi tư duy phản biện",
        "visualBreakdown": "Pro- (phía trước) + voc (gọi thách thức) + -ative",
        "ieltsSentence": "The philosopher's provocative thesis unsettled conventional assumptions regarding consciousness.",
        "vietnameseTranslation": "Luận điểm mang tính kích động tranh luận của triết gia đã làm lung lay các giả định truyền thống về ý thức.",
        "level": "C1",
        "collocation": "Provocative question / Provocative thesis"
      },
      {
        "word": "Vociferous",
        "partOfSpeech": "adj",
        "meaning": "La hét lớn tiếng, phản đối ầm ĩ kịch liệt",
        "visualBreakdown": "Voc- (tiếng nói) + fer (mang vác) + -ous",
        "ieltsSentence": "Civil advocacy enclaves staged vociferous protests against open-cast mineral extraction.",
        "vietnameseTranslation": "Các nhóm vận động dân sự đã tổ chức các cuộc biểu tình phản đối kịch liệt ầm ĩ chống lại việc khai thác khoáng sản lộ thiên.",
        "level": "C2",
        "collocation": "Vociferous opposition / Vociferous critic"
      },
      {
        "word": "Eloquent",
        "partOfSpeech": "adj",
        "meaning": "Hùng biện lưu loát, giàu sức thuyết phục",
        "visualBreakdown": "E- (ra ngoài) + loqu (nói chuyện) + -ent",
        "ieltsSentence": "The keynote diplomat delivered an eloquent plea for multilateral environmental cooperation.",
        "vietnameseTranslation": "Nhà ngoại giao phát biểu chính đã đưa ra một lời kêu gọi hùng biện đầy thuyết phục cho sự hợp tác môi trường đa phương.",
        "level": "C1",
        "collocation": "Eloquent speaker / Eloquent defense"
      },
      {
        "word": "Loquacious",
        "partOfSpeech": "adj",
        "meaning": "Bẻm mép, nói nhiều huyên thuyên",
        "visualBreakdown": "Loqu- (nói) + -acious (nhiều)",
        "ieltsSentence": "The loquacious nature of the interview candidate obscured a paucity of practical technical acumen.",
        "vietnameseTranslation": "Bản tính nói nhiều huyên thuyên của ứng viên phỏng vấn đã che đậy sự thiếu thốn nhạy bén kỹ thuật thực tế.",
        "level": "C2",
        "collocation": "Loquacious demeanor / Unusually loquacious"
      },
      {
        "word": "Colloquial",
        "partOfSpeech": "adj",
        "meaning": "Mang tính khẩu ngữ đời thường, không trang trọng",
        "visualBreakdown": "Col- (cùng nhau) + loqu (nói) + -ial",
        "ieltsSentence": "Academic manuscripts must avoid colloquial idioms in favor of rigorous lexical formality.",
        "vietnameseTranslation": "Bản thảo học thuật phải tránh các từ ngữ mang tính khẩu ngữ đời thường mà ưu tiên tính trang trọng nghiêm cẩn về mặt từ vựng.",
        "level": "C1",
        "collocation": "Colloquial language / Colloquial expression"
      },
      {
        "word": "Grandiloquent",
        "partOfSpeech": "adj",
        "meaning": "Nói khoác, đao to búa lớn, hoa mỹ sáo rỗng",
        "visualBreakdown": "Grandi- (to lớn) + loqu (nói) + -ent",
        "ieltsSentence": "The manifesto was dismissed as grandiloquent rhetoric devoid of pragmatic legislative backing.",
        "vietnameseTranslation": "Bản tuyên ngôn đã bị bác bỏ như một thứ tu từ đao to búa lớn sáo rỗng không có sự hậu thuẫn lập pháp thực tế.",
        "level": "C2",
        "collocation": "Grandiloquent language / Grandiloquent claims"
      },
      {
        "word": "Soliloquy",
        "partOfSpeech": "n",
        "meaning": "Độc thoại nội tâm một mình trên sân khấu",
        "visualBreakdown": "Soli- (cô độc) + loqu (nói) + -y",
        "ieltsSentence": "Hamlet's seminal soliloquy dramatizes the profound agony of moral indecision.",
        "vietnameseTranslation": "Đoạn độc thoại kinh điển của Hamlet đã kịch hóa nỗi đau đớn sâu sắc trước sự do dự về mặt đạo đức.",
        "level": "C2",
        "collocation": "Deliver a soliloquy / Dramatic soliloquy"
      },
      {
        "word": "Obloquy",
        "partOfSpeech": "n",
        "meaning": "Lời chửi rủa nhục mạ của dư luận, bia miệng",
        "visualBreakdown": "Ob- (chống lại) + loqu (nói) + -y",
        "ieltsSentence": "The corrupt magnate suffered relentless public obloquy following financial insolvency.",
        "vietnameseTranslation": "Tên tài phiệt tham nhũng đã phải hứng chịu những lời chửi rủa nhục mạ không ngớt của công chúng sau vụ vỡ nợ tài chính.",
        "level": "C2",
        "collocation": "Endure obloquy / Universal obloquy"
      },
      {
        "word": "Interlocutor",
        "partOfSpeech": "n",
        "meaning": "Người đàm thoại, đối tác cùng đối thoại",
        "visualBreakdown": "Inter- (ở giữa) + locut (nói) + -or",
        "ieltsSentence": "Diplomatic emissaries sought reliable interlocutors within the insurgent faction.",
        "vietnameseTranslation": "Các đặc phái viên ngoại giao tìm kiếm những đối tác đàm thoại đáng tin cậy bên trong phe nổi dậy.",
        "level": "C2",
        "collocation": "Key interlocutor / Diplomatic interlocutors"
      },
      {
        "word": "Circumlocution",
        "partOfSpeech": "n",
        "meaning": "Lối nói vòng vo tam quốc, quanh co",
        "visualBreakdown": "Circum- (vòng quanh) + locut (nói) + -ion",
        "ieltsSentence": "Political press officers employ evasive circumlocution to deflect inquiries regarding deficits.",
        "vietnameseTranslation": "Các viên chức báo chí chính trị sử dụng lối nói vòng vo né tránh để đánh lạc hướng các câu hỏi về thâm hụt ngân sách.",
        "level": "C2",
        "collocation": "Evasive circumlocution / Resort to circumlocution"
      },
      {
        "word": "Jurisdiction",
        "partOfSpeech": "n",
        "meaning": "Quyền tài phán, thẩm quyền pháp lý",
        "visualBreakdown": "Juris (luật) + dict (nói) + -ion",
        "ieltsSentence": "Maritime pollution incidents fall under the jurisdiction of the International Maritime Organization.",
        "vietnameseTranslation": "Các sự cố ô nhiễm biển thuộc thẩm quyền tài phán của Tổ chức Hàng hải Quốc tế.",
        "level": "C1",
        "collocation": "Fall under jurisdiction / Maritime jurisdiction"
      },
      {
        "word": "Malediction",
        "partOfSpeech": "n",
        "meaning": "Lời nguyền rủa độc địa, rủa sả",
        "visualBreakdown": "Male- (xấu ác) + dict (nói) + -ion",
        "ieltsSentence": "Ancient papyri contain funerary maledictions intended to deter prospective grave desecrators.",
        "vietnameseTranslation": "Giấy cói cổ chứa đựng những lời nguyền tang lễ nhằm răn đe những kẻ có ý định mạo phạm mồ mả.",
        "level": "C2",
        "collocation": "Utter a malediction / Bitter maledictions"
      },
      {
        "word": "Benediction",
        "partOfSpeech": "n",
        "meaning": "Lời cầu phúc, chúc phúc thiêng liêng",
        "visualBreakdown": "Bene- (tốt lành) + dict (nói) + -ion",
        "ieltsSentence": "The ecumenical assembly concluded with a ceremonial benediction for global peace.",
        "vietnameseTranslation": "Đại hội đại kết kết thúc bằng một lời cầu phúc long trọng vì hòa bình thế giới.",
        "level": "C2",
        "collocation": "Pronounce a benediction / Concluding benediction"
      },
      {
        "word": "Edict",
        "partOfSpeech": "n",
        "meaning": "Sắc lệnh ban bố của chính quyền tối cao",
        "visualBreakdown": "E- (ra ngoài) + dict (nói tuyên bố)",
        "ieltsSentence": "The imperial edict mandated the conservation of municipal water supplies.",
        "vietnameseTranslation": "Sắc lệnh hoàng gia bắt buộc việc bảo tồn các nguồn cung cấp nước đô thị.",
        "level": "C2",
        "collocation": "Imperial edict / Issue an edict"
      },
      {
        "word": "Indictment",
        "partOfSpeech": "n",
        "meaning": "Cáo trạng kết tội, minh chứng cho sự thất bại",
        "visualBreakdown": "In- + dict (nói buộc tội) + -ment",
        "ieltsSentence": "The escalating homelessness crisis constitutes a scathing indictment of social housing policies.",
        "vietnameseTranslation": "Cuộc khủng hoảng người vô gia cư leo thang cấu thành một cáo trạng đanh thép về các chính sách nhà ở xã hội.",
        "level": "C1",
        "collocation": "Scathing indictment / Formal indictment"
      },
      {
        "word": "Revoke",
        "partOfSpeech": "v",
        "meaning": "Thu hồi, hủy bỏ hiệu lực giấy phép/đặc quyền",
        "visualBreakdown": "Re- (lại) + voke (gọi về)",
        "ieltsSentence": "Regulators resolved to revoke the manufacturing license of the offending refinery.",
        "vietnameseTranslation": "Các cơ quan quản lý đã quyết định thu hồi giấy phép sản xuất của nhà máy lọc dầu vi phạm.",
        "level": "C1",
        "collocation": "Revoke a license / Revoke privileges"
      },
      {
        "word": "Invoke",
        "partOfSpeech": "v",
        "meaning": "Viện dẫn luật lệ, khẩn cầu sự giúp đỡ",
        "visualBreakdown": "In- (vào) + voke (gọi tiếng)",
        "ieltsSentence": "Constitutional lawyers invoked emergency clauses to safeguard civil liberties during the crisis.",
        "vietnameseTranslation": "Các luật sư hiến pháp đã viện dẫn các điều khoản khẩn cấp để bảo vệ quyền tự do dân sự trong cuộc khủng hoảng.",
        "level": "C1",
        "collocation": "Invoke article / Invoke sanctions"
      },
      {
        "word": "Vocation",
        "partOfSpeech": "n",
        "meaning": "Thiên chức, sứ mệnh nghề nghiệp đam mê",
        "visualBreakdown": "Voc- (tiếng gọi từ tâm) + -ation",
        "ieltsSentence": "Pedagogy is not merely a profession but a transformative social vocation.",
        "vietnameseTranslation": "Sư phạm không chỉ đơn thuần là một nghề nghiệp mà là một thiên chức xã hội có tính biến đổi sâu sắc.",
        "level": "C1",
        "collocation": "Sense of vocation / Chosen vocation"
      }
    ]
  },
  {
    "id": "stem-spec-spic-vid",
    "root": "SPEC/SPIC/VID-",
    "meaning": "Quan sát, xem xét, trực quan, nhãn quan",
    "origin": "Gốc Latin (specere: nhìn ngắm, videre: trông thấy)",
    "description": "Các gốc từ chủ đạo về tầm nhìn thị giác, khảo sát thực nghiệm, tiên lượng tương lai và mổ xẻ phân tích sự vật hiện tượng.",
    "tip": "Nhớ đến Inspect (soi xét) và Evidence (bằng chứng rõ ràng) – liên quan đến đôi mắt và sự trực quan.",
    "category": "Trục 2: Tri Thức, Nhận Thức & Diễn Ngôn",
    "axis": "Trục 2",
    "axisTitle": "TRỤC 2: TRI THỨC, NHẬN THỨC & DIỄN NGÔN",
    "axisSubtitle": "Mind & Discourse (Tư duy & Ngôn ngữ)",
    "stemKey": "SPEC/SPIC/VID-",
    "exampleWords": [
      {
        "word": "Conspicuous",
        "partOfSpeech": "adj",
        "meaning": "Rõ ràng, dễ thấy, nổi bật đập vào mắt",
        "visualBreakdown": "Con- (hoàn toàn) + spic (nhìn) + -uous",
        "ieltsSentence": "There is a conspicuous absence of qualified medical personnel in rural outposts.",
        "vietnameseTranslation": "Có một sự thiếu vắng rõ ràng dễ thấy các nhân viên y tế có trình độ tại các tiền đồn nông thôn.",
        "level": "C1",
        "collocation": "Conspicuous consumption / Conspicuously absent"
      },
      {
        "word": "Spectacle",
        "partOfSpeech": "n",
        "meaning": "Cảnh tượng ngoạn mục, quang cảnh hoành tráng",
        "visualBreakdown": "Spect- (nhìn ngắm) + -acle",
        "ieltsSentence": "The annual oceanic migration of baleen whales is a breathtaking ecological spectacle.",
        "vietnameseTranslation": "Cuộc di cư hàng năm trên đại dương của cá voi tấm sừng là một cảnh tượng sinh thái ngoạn mục ngạt thở.",
        "level": "C1",
        "collocation": "Visual spectacle / Impressive spectacle"
      },
      {
        "word": "Speculate",
        "partOfSpeech": "v",
        "meaning": "Suy đoán giả thuyết, đầu cơ tài chính",
        "visualBreakdown": "Specul- (nhìn xa trông rộng) + -ate",
        "ieltsSentence": "Economists speculate that algorithmic automation will displace manual clerical positions.",
        "vietnameseTranslation": "Các nhà kinh tế suy đoán rằng tự động hóa thuật toán sẽ thay thế các vị trí văn phòng thủ công.",
        "level": "C1",
        "collocation": "Speculate on the outcome / Speculate about reasons"
      },
      {
        "word": "Retrospective",
        "partOfSpeech": "adj",
        "meaning": "Hồi tưởng quá khứ, nhìn lại thời gian đã qua",
        "visualBreakdown": "Retro- (về sau) + spect (nhìn) + -ive",
        "ieltsSentence": "The academy published a retrospective analysis evaluating half a century of environmental treaties.",
        "vietnameseTranslation": "Viện hàn lâm đã công bố một phân tích nhìn lại quá khứ đánh giá nửa thế kỷ các hiệp ước môi trường.",
        "level": "C1",
        "collocation": "Retrospective study / Retrospective exhibition"
      },
      {
        "word": "Introspection",
        "partOfSpeech": "n",
        "meaning": "Sự tự soi xét nội tâm, suy tư bản ngã",
        "visualBreakdown": "Intro- (vào trong) + spect (nhìn) + -ion",
        "ieltsSentence": "Rigorous ethical scholarship demands constant self-critical introspection.",
        "vietnameseTranslation": "Nghiên cứu đạo đức học nghiêm cẩn đòi hỏi sự tự soi xét nội tâm mang tính phản biện liên tục.",
        "level": "C2",
        "collocation": "Deep introspection / Self-introspection"
      },
      {
        "word": "Circumspect",
        "partOfSpeech": "adj",
        "meaning": "Thận trọng, nhìn trước ngó sau cẩn trọng",
        "visualBreakdown": "Circum- (quanh) + spect (nhìn)",
        "ieltsSentence": "Central banking governors remain circumspect regarding further interest rate curtailments.",
        "vietnameseTranslation": "Các thống đốc ngân hàng trung ương vẫn hết sức thận trọng nhìn trước ngó sau về việc cắt giảm lãi suất tiếp theo.",
        "level": "C2",
        "collocation": "Extremely circumspect / Circumspect behavior"
      },
      {
        "word": "Despicable",
        "partOfSpeech": "adj",
        "meaning": "Đáng khinh bỉ, hèn hạ nhìn xuống khinh miệt",
        "visualBreakdown": "De- (xuống) + spic (nhìn) + -able",
        "ieltsSentence": "Exploiting child labor in mineral refineries represents a despicable ethical breach.",
        "vietnameseTranslation": "Bóc lột lao động trẻ em trong các lò luyện khoáng sản thể hiện một sự vi phạm đạo đức đáng khinh bỉ.",
        "level": "C2",
        "collocation": "Despicable crime / Utterly despicable"
      },
      {
        "word": "Perspicacious",
        "partOfSpeech": "adj",
        "meaning": "Sáng suốt nhạy bén, nhìn thấu suốt vấn đề",
        "visualBreakdown": "Per- (xuyên thấu) + spic (nhìn) + -acious",
        "ieltsSentence": "The perspicacious geopolitical analyst discerned simmering border tensions decades in advance.",
        "vietnameseTranslation": "Nhà phân tích địa chính trị sáng suốt nhạy bén đã nhìn thấu suốt những căng thẳng biên giới âm ỉ trước nhiều thập kỷ.",
        "level": "C2",
        "collocation": "Perspicacious observer / Perspicacious insight"
      },
      {
        "word": "Prospect",
        "partOfSpeech": "n",
        "meaning": "Triển vọng tương lai, cơ hội phía trước",
        "visualBreakdown": "Pro- (phía trước) + spect (nhìn)",
        "ieltsSentence": "The prospect of universal green energy deployment encourages global market investors.",
        "vietnameseTranslation": "Triển vọng triển khai năng lượng xanh toàn cầu khuyến khích các nhà đầu tư thị trường toàn cầu.",
        "level": "C1",
        "collocation": "Economic prospect / Bleak prospects"
      },
      {
        "word": "Evident",
        "partOfSpeech": "adj",
        "meaning": "Rõ ràng minh bạch, thấy rõ trước mắt",
        "visualBreakdown": "E- (ra ngoài) + vid (trông thấy) + -ent",
        "ieltsSentence": "The catastrophic consequences of marine overfishing are painfully evident worldwide.",
        "vietnameseTranslation": "Những hậu quả thảm khốc của việc đánh bắt cá quá mức trên biển hiển hiện rõ ràng đau đớn trên toàn thế giới.",
        "level": "C1",
        "collocation": "Self-evident / Abundantly evident"
      },
      {
        "word": "Provident",
        "partOfSpeech": "adj",
        "meaning": "Lo xa, biết nhìn xa chu tất cho tương lai",
        "visualBreakdown": "Pro- (trước) + vid (nhìn) + -ent",
        "ieltsSentence": "Provident fiscal management shields municipalities against sudden commodity market volatility.",
        "vietnameseTranslation": "Quản lý tài khóa biết lo xa bảo vệ các đô thị chống lại sự biến động đột ngột của thị trường hàng hóa.",
        "level": "C2",
        "collocation": "Provident planning / Provident fund"
      },
      {
        "word": "Improvise",
        "partOfSpeech": "v",
        "meaning": "Ứng biến tại chỗ, không chuẩn bị nhìn trước",
        "visualBreakdown": "Im- (không) + pro- (trước) + vis (nhìn)",
        "ieltsSentence": "Field medics had to improvise sterilization equipment using rudimentary field tools.",
        "vietnameseTranslation": "Các quân y thực địa đã phải ứng biến thiết bị khử trùng bằng các công cụ thô sơ trên chiến trường.",
        "level": "C1",
        "collocation": "Improvise a solution / Improvised performance"
      },
      {
        "word": "Visionary",
        "partOfSpeech": "adj",
        "meaning": "Có tầm nhìn xa trông rộng xuất chúng",
        "visualBreakdown": "Vis- (tầm nhìn) + -ion + -ary",
        "ieltsSentence": "Visionary urbanists champion pedestrian-centric mobility to rejuvenate city centers.",
        "vietnameseTranslation": "Các nhà quy hoạch đô thị có tầm nhìn xuất chúng cổ vũ giao thông lấy người đi bộ làm trung tâm để hồi sinh các trung tâm thành phố.",
        "level": "C1",
        "collocation": "Visionary leader / Visionary architecture"
      },
      {
        "word": "Suspect",
        "partOfSpeech": "adj",
        "meaning": "Đáng ngờ, nhìn từ dưới lên đầy nghi hoặc",
        "visualBreakdown": "Sub- (dưới) + spect (nhìn)",
        "ieltsSentence": "The methodological integrity of the pharmaceutical trial was rendered deeply suspect.",
        "vietnameseTranslation": "Tính liêm chính về phương pháp luận của cuộc thử nghiệm dược phẩm đã bị coi là vô cùng đáng ngờ.",
        "level": "C1",
        "collocation": "Highly suspect / Suspect methodology"
      },
      {
        "word": "Visage",
        "partOfSpeech": "n",
        "meaning": "Gương mặt, diện mạo thần thái",
        "visualBreakdown": "Vis- (trông thấy) + -age",
        "ieltsSentence": "Centuries of maritime weathering altered the stern visage of the granite lighthouse.",
        "vietnameseTranslation": "Nhiều thế kỷ chịu ảnh hưởng thời tiết biển đã làm biến đổi diện mạo nghiêm nghị của ngọn hải đăng bằng đá hoa cương.",
        "level": "C2",
        "collocation": "Stern visage / Familiar visage"
      },
      {
        "word": "Specter",
        "partOfSpeech": "n",
        "meaning": "Bóng ma ám ảnh, nỗi sợ hãi chập chờn",
        "visualBreakdown": "Spect- (bóng hình nhìn thấy) + -er",
        "ieltsSentence": "The haunting specter of stagflation looms over industrialized trade partners.",
        "vietnameseTranslation": "Bóng ma ám ảnh của tình trạng đình lạm đang lờ mờ bao trùm lên các đối tác thương mại công nghiệp hóa.",
        "level": "C2",
        "collocation": "Specter of famine / Raise the specter"
      },
      {
        "word": "Perspective",
        "partOfSpeech": "n",
        "meaning": "Góc nhìn, lăng kính nhận thức quan điểm",
        "visualBreakdown": "Per- (xuyên qua) + spect (nhìn) + -ive",
        "ieltsSentence": "Cross-cultural ethnography offers an invaluable perspective on human kinship systems.",
        "vietnameseTranslation": "Dân tộc học liên văn hóa mang lại một góc nhìn vô giá về hệ thống thân tộc của con người.",
        "level": "C1",
        "collocation": "Historical perspective / Gain perspective"
      },
      {
        "word": "Spectator",
        "partOfSpeech": "n",
        "meaning": "Khán giả đến tận mắt theo dõi sự kiện",
        "visualBreakdown": "Spect- (nhìn) + -ator",
        "ieltsSentence": "Spectators marveled at the synchronicity displayed by the Olympic gymnastic troupe.",
        "vietnameseTranslation": "Khán giả kinh ngạc trước sự đồng điệu xuất thần được thể hiện bởi đoàn thể dục dụng cụ Olympic.",
        "level": "C1",
        "collocation": "Spectator sport / Innocent spectator"
      },
      {
        "word": "Spurious",
        "partOfSpeech": "adj",
        "meaning": "Giả mạo, nhìn ngoài tưởng thật nhưng sai lệch",
        "visualBreakdown": "Spur- (nhìn lừa dối) + -ious",
        "ieltsSentence": "Epidemiologists dismantled spurious correlations between vaccination rates and unrelated syndromes.",
        "vietnameseTranslation": "Các nhà dịch tễ học đã bóc trần các mối tương quan giả mạo giữa tỷ lệ tiêm chủng và các hội chứng không liên quan.",
        "level": "C2",
        "collocation": "Spurious argument / Spurious correlation"
      },
      {
        "word": "Visible",
        "partOfSpeech": "adj",
        "meaning": "Hữu hình, có thể nhìn thấy rõ ràng",
        "visualBreakdown": "Vis- (nhìn) + -ible",
        "ieltsSentence": "Atmospheric pollutants left a visible layer of grey particulate haze over the metropolis.",
        "vietnameseTranslation": "Các chất ô nhiễm khí quyển đã để lại một lớp sương mù bụi mịn màu xám có thể nhìn thấy rõ ràng bao phủ đô thị.",
        "level": "C1",
        "collocation": "Visible progress / Barely visible"
      },
      {
        "word": "Visual",
        "partOfSpeech": "adj",
        "meaning": "Thuộc thị giác, hình ảnh trực quan",
        "visualBreakdown": "Vis- (nhìn) + -ual",
        "ieltsSentence": "Visual aids amplify didactic comprehension in complex astronomical lectures.",
        "vietnameseTranslation": "Các phương tiện hỗ trợ trực quan tăng cường khả năng tiếp thu bài giảng trong các bài thuyết trình thiên văn học phức tạp.",
        "level": "C1",
        "collocation": "Visual arts / Visual representation"
      },
      {
        "word": "Specimen",
        "partOfSpeech": "n",
        "meaning": "Mẫu vật thực nghiệm để quan sát phân tích",
        "visualBreakdown": "Spec- (nhìn ngắm) + -imen",
        "ieltsSentence": "Botanists collected pristine herbal specimens from the alpine altitude canopy.",
        "vietnameseTranslation": "Các nhà thực vật học đã thu thập các mẫu thảo mộc nguyên sơ từ tán rừng ở độ cao núi cao.",
        "level": "C1",
        "collocation": "Laboratory specimen / Collect specimens"
      },
      {
        "word": "Aspect",
        "partOfSpeech": "n",
        "meaning": "Khía cạnh, góc độ khảo sát của vấn đề",
        "visualBreakdown": "Ad- (hướng về) + spect (nhìn)",
        "ieltsSentence": "Sociologists investigated every qualitative aspect of urban displacement.",
        "vietnameseTranslation": "Các nhà xã hội học đã điều tra mọi khía cạnh định tính của sự dịch chuyển dân cư đô thị.",
        "level": "C1",
        "collocation": "Crucial aspect / Financial aspect"
      },
      {
        "word": "Spectacular",
        "partOfSpeech": "adj",
        "meaning": "Hùng vĩ, ngoạn mục lóa mắt",
        "visualBreakdown": "Spect- (nhìn) + -acular",
        "ieltsSentence": "The geothermal volcanic explosion produced a spectacular plume of steam and ash.",
        "vietnameseTranslation": "Vụ nổ núi lửa địa nhiệt tạo ra một cột hơi nước và tro bụi hùng vĩ ngoạn mục.",
        "level": "C1",
        "collocation": "Spectacular failure / Spectacular view"
      },
      {
        "word": "Vista",
        "partOfSpeech": "n",
        "meaning": "Khung cảnh nhìn xa rộng mở, viễn cảnh",
        "visualBreakdown": "Vist- (trông thấy) + -a",
        "ieltsSentence": "The mountain pass opened into a panoramic vista of sweeping emerald valleys.",
        "vietnameseTranslation": "Đèo núi mở ra một khung cảnh nhìn xa toàn cảnh về những thung lũng ngọc bích trải dài ngút ngàn.",
        "level": "C2",
        "collocation": "Sweeping vista / Open up new vistas"
      }
    ]
  },
  {
    "id": "stem-sens-sent-path",
    "root": "SENS/SENT/PATH-",
    "meaning": "Cảm giác, cảm thụ, thấu cảm, đau đớn",
    "origin": "Gốc Latin (sentire: cảm nhận) & Hy Lạp (pathos: cảm xúc, nỗi đau)",
    "description": "Biểu thị những rung động giác quan, khả năng đồng cảm xã hội, sự thấu cảm tinh thần hoặc các trạng thái đau đớn bệnh lý.",
    "tip": "Nhớ đến Sensitive (nhạy cảm), Sympathy (thấu cảm) hoặc Pathology (bệnh học) – đều gắn với cảm xúc và cảm nhận.",
    "category": "Trục 2: Tri Thức, Nhận Thức & Diễn Ngôn",
    "axis": "Trục 2",
    "axisTitle": "TRỤC 2: TRI THỨC, NHẬN THỨC & DIỄN NGÔN",
    "axisSubtitle": "Mind & Discourse (Tư duy & Ngôn ngữ)",
    "stemKey": "SENS/SENT/PATH-",
    "exampleWords": [
      {
        "word": "Empathy",
        "partOfSpeech": "n",
        "meaning": "Sự thấu cảm, khả năng đặt mình vào nỗi đau người khác",
        "visualBreakdown": "Em- (bên trong) + pathy (cảm xúc)",
        "ieltsSentence": "Fostering emotional empathy in early childhood deters bullying and discriminatory conduct.",
        "vietnameseTranslation": "Nuôi dưỡng sự thấu cảm cảm xúc ở thời thơ ấu giúp ngăn chặn hành vi bắt nạt và phân biệt đối xử.",
        "level": "C1",
        "collocation": "Feel empathy / Cultivate empathy"
      },
      {
        "word": "Apathy",
        "partOfSpeech": "n",
        "meaning": "Sự thờ ơ lãnh đạm, nguội lạnh cảm xúc",
        "visualBreakdown": "A- (không) + pathy (cảm xúc)",
        "ieltsSentence": "Voter apathy poses a grave existential danger to participatory democratic institutions.",
        "vietnameseTranslation": "Sự thờ ơ lãnh đạm của cử tri đặt ra mối nguy hiểm sinh tồn nghiêm trọng đối với các thể chế dân chủ tham gia.",
        "level": "C1",
        "collocation": "Widespread apathy / Political apathy"
      },
      {
        "word": "Antipathy",
        "partOfSpeech": "n",
        "meaning": "Ác cảm sâu sắc, sự thù ghét đối kháng",
        "visualBreakdown": "Anti- (chống lại) + pathy (cảm xúc)",
        "ieltsSentence": "Deep-seated historical antipathy undermined bilateral peace negotiations.",
        "vietnameseTranslation": "Ác cảm lịch sử thâm căn cố đế đã phá hoại các cuộc đàm phán hòa bình song phương.",
        "level": "C2",
        "collocation": "Mutual antipathy / Deep antipathy"
      },
      {
        "word": "Pathology",
        "partOfSpeech": "n",
        "meaning": "Bệnh lý học, nguồn gốc và diễn biến bệnh tật",
        "visualBreakdown": "Patho- (đau ốm, bệnh) + logy (nghiên cứu)",
        "ieltsSentence": "Cellular pathology illuminates the degenerative mechanics of neurological disorders.",
        "vietnameseTranslation": "Bệnh lý học tế bào làm sáng tỏ cơ chế thoái hóa của các rối loạn thần kinh.",
        "level": "C1",
        "collocation": "Clinical pathology / Underlying pathology"
      },
      {
        "word": "Pathos",
        "partOfSpeech": "n",
        "meaning": "Sức gợi cảm xúc bi thương, lòng trắc ẩn",
        "visualBreakdown": "Path- (nỗi đau) + -os",
        "ieltsSentence": "The tragedy resonates because of the genuine pathos woven into the protagonist's downfall.",
        "vietnameseTranslation": "Vở bi kịch gây được tiếng vang nhờ sức gợi cảm xúc bi thương chân thực được đan cài vào sự sụp đổ của nhân vật chính.",
        "level": "C2",
        "collocation": "Poignant pathos / Deep pathos"
      },
      {
        "word": "Sentient",
        "partOfSpeech": "adj",
        "meaning": "Có tri giác, có cảm thụ đau đớn và hân hoan",
        "visualBreakdown": "Sent- (cảm giác) + -ient",
        "ieltsSentence": "Bioethicists argue passionately for the moral status of sentient non-human species.",
        "vietnameseTranslation": "Các nhà đạo đức sinh học tranh luận sôi nổi về vị thế đạo đức của các loài phi nhân loại có tri giác.",
        "level": "C2",
        "collocation": "Sentient beings / Sentient life"
      },
      {
        "word": "Sensory",
        "partOfSpeech": "adj",
        "meaning": "Thuộc về giác quan thể xác",
        "visualBreakdown": "Sens- (giác quan) + -ory",
        "ieltsSentence": "Sensory deprivation experiments reveal how the human brain generates intrinsic imagery.",
        "vietnameseTranslation": "Các thí nghiệm cách ly giác quan tiết lộ cách bộ não con người tự tạo ra các hình ảnh nội tại.",
        "level": "C1",
        "collocation": "Sensory overload / Sensory perception"
      },
      {
        "word": "Resentment",
        "partOfSpeech": "n",
        "meaning": "Nỗi uất hận cay đắng, ấm ức chất chứa",
        "visualBreakdown": "Re- (lại) + sent (cảm thấy) + -ment",
        "ieltsSentence": "Widening income inequality breeds festering socio-economic resentment across generations.",
        "vietnameseTranslation": "Bất bình đẳng thu nhập ngày càng gia tăng sinh ra nỗi uất hận cay đắng âm ỉ về kinh tế xã hội qua nhiều thế hệ.",
        "level": "C1",
        "collocation": "Harbor resentment / Deep resentment"
      },
      {
        "word": "Sentiment",
        "partOfSpeech": "n",
        "meaning": "Tâm tư tình cảm, cảm nghĩ chung của tập thể",
        "visualBreakdown": "Sent- (cảm nhận) + -i- + -ment",
        "ieltsSentence": "Consumer market sentiment soured abruptly amid geopolitical conflict escalations.",
        "vietnameseTranslation": "Tâm tư tình cảm của thị trường tiêu dùng trở nên xấu đi đột ngột trong bối cảnh xung đột địa chính trị leo thang.",
        "level": "C1",
        "collocation": "Public sentiment / Market sentiment"
      },
      {
        "word": "Sensational",
        "partOfSpeech": "adj",
        "meaning": "Gây giật gân, khơi động tò mò thái quá",
        "visualBreakdown": "Sens- (cảm giác) + -ation + -al",
        "ieltsSentence": "Tabloid press coverage favored sensational headlines over nuanced epidemiological facts.",
        "vietnameseTranslation": "Tin tức báo chí lá cải ưa chuộng các tiêu đề giật gân hơn là các sự thật dịch tễ học có sắc thái tinh tế.",
        "level": "C1",
        "collocation": "Sensational news / Sensational claims"
      },
      {
        "word": "Sensitive",
        "partOfSpeech": "adj",
        "meaning": "Nhạy cảm, dễ bị tác động hoặc tổn thương",
        "visualBreakdown": "Sens- (cảm giác) + -itive",
        "ieltsSentence": "Coral polyps are exceptionally sensitive to minute fluctuations in seawater salinity.",
        "vietnameseTranslation": "Các polyp san hô đặc biệt nhạy cảm với những biến động nhỏ về độ mặn của nước biển.",
        "level": "C1",
        "collocation": "Highly sensitive / Politically sensitive"
      },
      {
        "word": "Consensus",
        "partOfSpeech": "n",
        "meaning": "Sự đồng thuận chung, sự cùng chung cảm nghĩ",
        "visualBreakdown": "Con- (cùng) + sens (cảm nhận) + -us",
        "ieltsSentence": "The climate summit culminated in a historic consensus to phase out coal subsidies.",
        "vietnameseTranslation": "Hội nghị thượng đỉnh về khí hậu đã lên đến đỉnh điểm bằng một sự đồng thuận lịch sử nhằm loại bỏ trợ cấp than đá.",
        "level": "C1",
        "collocation": "Broad consensus / General consensus"
      },
      {
        "word": "Dissent",
        "partOfSpeech": "n",
        "meaning": "Ý kiến bất đồng, sự phản kháng đối nghịch",
        "visualBreakdown": "Dis- (khác biệt) + sent (cảm nghĩ)",
        "ieltsSentence": "Suppressing academic dissent stifles progressive scientific discourse and innovation.",
        "vietnameseTranslation": "Việc đàn áp các ý kiến bất đồng học thuật làm bóp nghẹt các diễn ngôn khoa học tiến bộ và sự đổi mới.",
        "level": "C2",
        "collocation": "Voice dissent / Political dissent"
      },
      {
        "word": "Assent",
        "partOfSpeech": "n",
        "meaning": "Sự ưng thuận, phê chuẩn bằng lòng",
        "visualBreakdown": "Ad- (hướng về) + sent (cảm nghĩ)",
        "ieltsSentence": "The constitutional treaty required the unanimous assent of all twenty sovereign members.",
        "vietnameseTranslation": "Hiệp ước hiến pháp đòi hỏi sự ưng thuận nhất trí của tất cả 20 thành viên có chủ quyền.",
        "level": "C2",
        "collocation": "Royal assent / Give assent"
      },
      {
        "word": "Sympathetic",
        "partOfSpeech": "adj",
        "meaning": "Đồng cảm sẻ chia, tán thành ủng hộ",
        "visualBreakdown": "Sym- (cùng) + path (cảm nhận) + -etic",
        "ieltsSentence": "Municipal leaders were overtly sympathetic to the plight of displaced tenants.",
        "vietnameseTranslation": "Các nhà lãnh đạo đô thị đã công khai đồng cảm sẻ chia với hoàn cảnh khó khăn của những người thuê nhà bị mất chỗ ở.",
        "level": "C1",
        "collocation": "Sympathetic hearing / Deeply sympathetic"
      },
      {
        "word": "Telepathy",
        "partOfSpeech": "n",
        "meaning": "Thần giao cách cảm, truyền cảm giác từ xa",
        "visualBreakdown": "Tele- (xa) + pathy (cảm nhận)",
        "ieltsSentence": "Scientific skepticism remains pervasive regarding alleged demonstrations of telepathy.",
        "vietnameseTranslation": "Sự hoài nghi khoa học vẫn lan rộng liên quan đến cái gọi là các cuộc trình diễn thần giao cách cảm.",
        "level": "C1",
        "collocation": "Mental telepathy / Claims of telepathy"
      },
      {
        "word": "Psychopathy",
        "partOfSpeech": "n",
        "meaning": "Chứng thái nhân cách, rối loạn tâm thần vô cảm",
        "visualBreakdown": "Psycho- (tâm trí) + pathy (bệnh lý đau đớn)",
        "ieltsSentence": "Clinical forensic psychology identifies severe psychopathy by an utter absence of remorse.",
        "vietnameseTranslation": "Tâm lý học pháp y lâm sàng nhận diện chứng thái nhân cách nặng thông qua việc hoàn toàn không có cảm giác hối hận.",
        "level": "C2",
        "collocation": "Diagnose psychopathy / Traits of psychopathy"
      },
      {
        "word": "Sociopath",
        "partOfSpeech": "n",
        "meaning": "Kẻ chống đối xã hội, vô cảm với chuẩn mực",
        "visualBreakdown": "Socio- (xã hội) + path (bệnh lý)",
        "ieltsSentence": "Corporate sociopaths disregard environmental destruction in relentless pursuit of dividend yield.",
        "vietnameseTranslation": "Những kẻ chống đối xã hội trong giới doanh nghiệp coi thường sự hủy hoại môi trường để theo đuổi lợi suất cổ tức không ngừng nghỉ.",
        "level": "C2",
        "collocation": "Corporate sociopath / Diagnosed sociopath"
      },
      {
        "word": "Idiopathy",
        "partOfSpeech": "n",
        "meaning": "Bệnh vô căn, chứng bệnh tự phát không rõ căn nguyên",
        "visualBreakdown": "Idio- (tự thân) + pathy (bệnh)",
        "ieltsSentence": "Cases of pulmonary idiopathy require exhaustive genetic screening to deduce etiologies.",
        "vietnameseTranslation": "Các trường hợp bệnh phổi tự phát vô căn đòi hỏi phải sàng lọc di truyền toàn diện để suy ra nguyên nhân bệnh học.",
        "level": "C2",
        "collocation": "Clinical idiopathy / Medical diagnosis"
      },
      {
        "word": "Sensibility",
        "partOfSpeech": "n",
        "meaning": "Khả năng cảm thụ tinh tế, tính nhạy cảm nghệ thuật",
        "visualBreakdown": "Sens- (cảm giác) + -ibility",
        "ieltsSentence": "Modernist literature revolutionized aesthetic sensibilities across post-war Europe.",
        "vietnameseTranslation": "Văn học hiện đại đã cách mạng hóa khả năng cảm thụ thẩm mỹ trên khắp châu Âu thời hậu chiến.",
        "level": "C1",
        "collocation": "Artistic sensibility / Offend sensibilities"
      },
      {
        "word": "Sensuous",
        "partOfSpeech": "adj",
        "meaning": "Gây thích thú giác quan, đầy khoái cảm nhục cảm",
        "visualBreakdown": "Sens- (giác quan) + -uous",
        "ieltsSentence": "The botanical conservatory enveloped visitors in sensuous perfumes and humid warmth.",
        "vietnameseTranslation": "Nhà kính thực vật bao bọc du khách trong những hương thơm ngây ngất và sự ấm áp ẩm ướt dễ chịu.",
        "level": "C2",
        "collocation": "Sensuous experience / Sensuous curves"
      },
      {
        "word": "Sententious",
        "partOfSpeech": "adj",
        "meaning": "Lên giọng dạy đời, đạo mạo sáo rỗng",
        "visualBreakdown": "Sentent- (châm ngôn) + -ious",
        "ieltsSentence": "The commencement address deteriorated into sententious platitudes lacking pragmatic substance.",
        "vietnameseTranslation": "Bài phát biểu tại lễ tốt nghiệp đã thoái hóa thành những lời giáo điều dạy đời sáo rỗng thiếu thực chất.",
        "level": "C2",
        "collocation": "Sententious moralizing / Sententious tone"
      },
      {
        "word": "Presentiment",
        "partOfSpeech": "n",
        "meaning": "Linh cảm điềm gở, cảm giác trước điều chẳng lành",
        "visualBreakdown": "Pre- (trước) + sent (cảm thấy) + -i- + -ment",
        "ieltsSentence": "The captain harbored an uneasy presentiment before navigating into the tempest.",
        "vietnameseTranslation": "Người thuyền trưởng chất chứa một linh cảm chẳng lành bất an trước khi lái tàu vào cơn bão dữ.",
        "level": "C2",
        "collocation": "Gloomy presentiment / Have a presentiment"
      },
      {
        "word": "Desensitize",
        "partOfSpeech": "v",
        "meaning": "Làm chai sạn cảm xúc, làm mất tính nhạy cảm",
        "visualBreakdown": "De- (giảm) + sensitize (làm nhạy cảm)",
        "ieltsSentence": "Continuous exposure to graphical violence can insidiously desensitize impressionable adolescents.",
        "vietnameseTranslation": "Tiếp xúc liên tục với bạo lực đồ họa có thể làm chai sạn cảm xúc của những thanh thiếu niên dễ bị ảnh hưởng.",
        "level": "C1",
        "collocation": "Desensitize the public / Desensitize to violence"
      },
      {
        "word": "Nonsensical",
        "partOfSpeech": "adj",
        "meaning": "Vô nghĩa, ngớ ngẩn phi lý",
        "visualBreakdown": "Non- (không) + sens (ý nghĩa) + -ical",
        "ieltsSentence": "The conspiracy theory offered nonsensical assertions easily disproven by astronomical telemetry.",
        "vietnameseTranslation": "Thuyết âm mưu đưa ra những khẳng định vô nghĩa ngớ ngẩn dễ dàng bị bác bỏ bởi các phép đo từ xa thiên văn.",
        "level": "C1",
        "collocation": "Nonsensical argument / Utterly nonsensical"
      }
    ]
  },
  {
    "id": "stem-anthrop-dem",
    "root": "ANTHROP/DEM-",
    "meaning": "Con người, nhân loại, quần chúng dân cư",
    "origin": "Gốc Hy Lạp (anthropos: con người, demos: nhân dân)",
    "description": "Các gốc từ mô tả giống loài con người, sự tiến hóa xã hội, quyền công dân và biến động cơ cấu dân số học.",
    "tip": "Nhớ đến Anthropology (nhân học) và Democracy (dân chủ) – trung tâm luôn là con người và tập thể nhân dân.",
    "category": "Trục 3: Con Người, Quản Trị & Thể Chế",
    "axis": "Trục 3",
    "axisTitle": "TRỤC 3: CON NGƯỜI, QUẢN TRỊ & THỂ CHẾ",
    "axisSubtitle": "Society & Governance (Con người & Thể chế)",
    "stemKey": "ANTHROP/DEM-",
    "exampleWords": [
      {
        "word": "Anthropogenic",
        "partOfSpeech": "adj",
        "meaning": "Do hoạt động con người gây ra, có nguồn gốc nhân tạo",
        "visualBreakdown": "Anthrop- (con người) + gen (sinh ra) + -ic",
        "ieltsSentence": "The report establishes irrefutable evidence of anthropogenic global climate disruption.",
        "vietnameseTranslation": "Báo cáo thiết lập bằng chứng không thể chối cãi về sự gián đoạn khí hậu toàn cầu do con người gây ra.",
        "level": "C1",
        "collocation": "Anthropogenic emissions / Anthropogenic causes"
      },
      {
        "word": "Misanthrope",
        "partOfSpeech": "n",
        "meaning": "Kẻ căm ghét loài người, lánh đời chán ghét xã hội",
        "visualBreakdown": "Mis- (ghét) + anthrope (con người)",
        "ieltsSentence": "Disillusioned by perpetual geopolitical warfare, the retired diplomat became an isolated misanthrope.",
        "vietnameseTranslation": "Vỡ mộng trước những cuộc chiến địa chính trị liên miên, vị cựu ngoại giao đã trở thành một kẻ lánh đời căm ghét xã hội cô độc.",
        "level": "C2",
        "collocation": "Reclusive misanthrope / Confirmed misanthrope"
      },
      {
        "word": "Philanthropy",
        "partOfSpeech": "n",
        "meaning": "Lòng bác ái nhân đạo, hoạt động từ thiện vị tha",
        "visualBreakdown": "Phil- (yêu thương) + anthrop (con người) + -y",
        "ieltsSentence": "Strategic corporate philanthropy directs capital towards underprivileged educational infrastructure.",
        "vietnameseTranslation": "Hoạt động từ thiện doanh nghiệp có chiến lược hướng dòng vốn vào cơ sở hạ tầng giáo dục vùng khó khăn.",
        "level": "C1",
        "collocation": "Corporate philanthropy / Dedicate to philanthropy"
      },
      {
        "word": "Demographic",
        "partOfSpeech": "adj",
        "meaning": "Thuộc về nhân khẩu học, cơ cấu dân số",
        "visualBreakdown": "Demo- (dân số) + graph (ghi chép) + -ic",
        "ieltsSentence": "Rapid demographic aging exerts unprecedented pressure on state pension reserves.",
        "vietnameseTranslation": "Sự già hóa nhân khẩu học thần tốc gây ra áp lực chưa từng có lên các quỹ dự trữ hưu trí quốc gia.",
        "level": "C1",
        "collocation": "Demographic shift / Demographic transition"
      },
      {
        "word": "Demagogue",
        "partOfSpeech": "n",
        "meaning": "Kẻ mị dân xảo trá, kích động đám đông vì mưu đồ cá nhân",
        "visualBreakdown": "Demo- (dân chúng) + agogue (dẫn dắt, xúi giục)",
        "ieltsSentence": "The charismatic demagogue exploited working-class grievances through xenophobic rhetoric.",
        "vietnameseTranslation": "Kẻ mị dân lôi cuốn đã khai thác những bất mãn của tầng lớp lao động thông qua những lời lẽ bài ngoại.",
        "level": "C2",
        "collocation": "Dangerous demagogue / Populist demagogue"
      },
      {
        "word": "Epidemic",
        "partOfSpeech": "n",
        "meaning": "Dịch bệnh bùng phát lan rộng trong dân chúng",
        "visualBreakdown": "Epi- (trên) + dem (dân) + -ic",
        "ieltsSentence": "Coordinated quarantine measures contained the airborne epidemic before catastrophic community transmission.",
        "vietnameseTranslation": "Các biện pháp cách ly phối hợp đã ngăn chặn được dịch bệnh lây truyền qua đường không khí trước khi lây lan thảm khốc trong cộng đồng.",
        "level": "C1",
        "collocation": "Epidemic outbreak / Obesity epidemic"
      },
      {
        "word": "Endemic",
        "partOfSpeech": "adj",
        "meaning": "Đặc hữu cục bộ trong một cộng đồng địa phương",
        "visualBreakdown": "En- (bên trong) + dem (dân) + -ic",
        "ieltsSentence": "Corruption became endemic throughout the unreformed municipal bureaucracy.",
        "vietnameseTranslation": "Tham nhũng đã trở thành căn bệnh thâm căn cố đế đặc hữu khắp bộ máy quan liêu đô thị chưa được cải cách.",
        "level": "C2",
        "collocation": "Endemic poverty / Endemic species"
      },
      {
        "word": "Democracy",
        "partOfSpeech": "n",
        "meaning": "Nền dân chủ, chế độ quyền lực thuộc về nhân dân",
        "visualBreakdown": "Demo- (dân) + cracy (cai trị)",
        "ieltsSentence": "A free and unfettered investigative press is the indispensable bulwark of healthy democracy.",
        "vietnameseTranslation": "Một nền báo chí điều tra tự do và không bị trói buộc là bức tường thành không thể thiếu của một nền dân chủ lành mạnh.",
        "level": "C1",
        "collocation": "Participatory democracy / Fragile democracy"
      },
      {
        "word": "Anthropology",
        "partOfSpeech": "n",
        "meaning": "Nhân chủng học, khoa học nghiên cứu loài người",
        "visualBreakdown": "Anthrop- (con người) + logy (khoa học nghiên cứu)",
        "ieltsSentence": "Cultural anthropology investigates cross-generational ceremonial rituals across nomadic clans.",
        "vietnameseTranslation": "Nhân chủng học văn hóa nghiên cứu các nghi lễ tế tự qua nhiều thế hệ giữa các thị tộc du mục.",
        "level": "C1",
        "collocation": "Cultural anthropology / Physical anthropology"
      },
      {
        "word": "Anthropocentric",
        "partOfSpeech": "adj",
        "meaning": "Lấy con người làm trung tâm vũ trụ, ngạo mạn",
        "visualBreakdown": "Anthrop- (người) + centric (trung tâm)",
        "ieltsSentence": "Ecologists criticize the anthropocentric worldview for disregarding biodiversity value.",
        "vietnameseTranslation": "Các nhà sinh thái học chỉ trích thế giới quan lấy con người làm trung tâm vì đã xem nhẹ giá trị đa dạng sinh học.",
        "level": "C2",
        "collocation": "Anthropocentric perspective / Anthropocentric bias"
      },
      {
        "word": "Democratize",
        "partOfSpeech": "v",
        "meaning": "Dân chủ hóa, đưa quyền lực/tiện ích đến với toàn dân",
        "visualBreakdown": "Demo- (dân) + crat (quyền lực) + -ize",
        "ieltsSentence": "Open-access digital repositories democratize scholarly knowledge for underprivileged learners.",
        "vietnameseTranslation": "Các kho lưu trữ kỹ thuật số truy cập mở giúp dân chủ hóa tri thức học thuật cho những người học có hoàn cảnh khó khăn.",
        "level": "C1",
        "collocation": "Democratize access / Democratize technology"
      },
      {
        "word": "Demotic",
        "partOfSpeech": "adj",
        "meaning": "Thuộc về bình dân đại chúng, thông dụng",
        "visualBreakdown": "Dem- (dân chúng) + -otic",
        "ieltsSentence": "The poet abandoned archaic courtly diction in favor of vivid demotic vernacular.",
        "vietnameseTranslation": "Nhà thơ đã từ bỏ lối dùng từ cung đình cổ xưa để chuyển sang ngôn ngữ bình dân đại chúng sống động.",
        "level": "C2",
        "collocation": "Demotic speech / Demotic style"
      },
      {
        "word": "Anthropomorphism",
        "partOfSpeech": "n",
        "meaning": "Thuyết gán tính cách hình dáng người cho muông thú/vật",
        "visualBreakdown": "Anthrop- (người) + morph (hình dạng) + -ism",
        "ieltsSentence": "Fables frequently employ anthropomorphism to communicate moral precepts to children.",
        "vietnameseTranslation": "Truyện ngụ ngôn thường xuyên sử dụng thủ pháp nhân hóa gán tính cách người để truyền đạt các bài học đạo đức cho trẻ nhỏ.",
        "level": "C2",
        "collocation": "Literary anthropomorphism / Avoid anthropomorphism"
      },
      {
        "word": "Pandemic",
        "partOfSpeech": "n",
        "meaning": "Đại dịch toàn cầu bùng phát khắp mọi châu lục",
        "visualBreakdown": "Pan- (tất cả) + dem (dân chúng) + -ic",
        "ieltsSentence": "The global pandemic triggered sweeping disruptions across international supply networks.",
        "vietnameseTranslation": "Đại dịch toàn cầu đã gây ra sự gián đoạn diện rộng khắp các mạng lưới cung ứng quốc tế.",
        "level": "C1",
        "collocation": "Global pandemic / Pandemic preparedness"
      },
      {
        "word": "Demophobia",
        "partOfSpeech": "n",
        "meaning": "Chứng sợ đám đông hỗn loạn",
        "visualBreakdown": "Demo- (đám đông) + phobia (nỗi sợ)",
        "ieltsSentence": "Extreme agoraphobia often manifests alongside severe demophobia in crowded urban transit hubs.",
        "vietnameseTranslation": "Hội chứng sợ không gian mở nghiêm trọng thường biểu hiện cùng với chứng sợ đám đông tại các đầu mối giao thông đông đúc.",
        "level": "C2",
        "collocation": "Suffer from demophobia / Acute demophobia"
      },
      {
        "word": "Anthropoid",
        "partOfSpeech": "adj",
        "meaning": "Có hình dạng tựa như con người, dạng vượn người",
        "visualBreakdown": "Anthrop- (người) + -oid (có hình dáng dạng)",
        "ieltsSentence": "Paleontologists unearthed fossilized skulls of ancient anthropoid primates.",
        "vietnameseTranslation": "Các nhà cổ sinh vật học đã khai quật những hộp sọ hóa thạch của các loài linh trưởng dạng người cổ đại.",
        "level": "C2",
        "collocation": "Anthropoid ape / Anthropoid remains"
      },
      {
        "word": "Anthropomorphic",
        "partOfSpeech": "adj",
        "meaning": "Mang tính nhân hóa, gán thuộc tính người",
        "visualBreakdown": "Anthrop- + morph- + -ic",
        "ieltsSentence": "Ancient deities were portrayed with flawed anthropomorphic temperaments.",
        "vietnameseTranslation": "Các vị thần cổ đại được khắc họa với tính khí nhân hóa đầy khiếm khuyết của con người.",
        "level": "C2",
        "collocation": "Anthropomorphic deity / Anthropomorphic representation"
      },
      {
        "word": "Demographical",
        "partOfSpeech": "adj",
        "meaning": "Có tính chất liên quan biến động nhân khẩu học",
        "visualBreakdown": "Demo- + graph- + -ical",
        "ieltsSentence": "Demographical disparities dictate differentiated healthcare expenditure allocation.",
        "vietnameseTranslation": "Sự chênh lệch về mặt nhân khẩu học quyết định việc phân bổ chi tiêu y tế có sự phân hóa.",
        "level": "C1",
        "collocation": "Demographical data / Demographical research"
      },
      {
        "word": "Anthroposphere",
        "partOfSpeech": "n",
        "meaning": "Quyển nhân loại, phần trái đất chịu tác động con người",
        "visualBreakdown": "Anthrop- (người) + sphere (quyển địa cầu)",
        "ieltsSentence": "The burgeoning anthroposphere has decisively modified natural biosphere cycles.",
        "vietnameseTranslation": "Quyển nhân loại đang mở rộng nhanh chóng đã làm biến đổi dứt khoát các chu trình sinh quyển tự nhiên.",
        "level": "C2",
        "collocation": "Impact the anthroposphere / Dynamics of anthroposphere"
      },
      {
        "word": "Palaeoanthropology",
        "partOfSpeech": "n",
        "meaning": "Cổ nhân chủng học, nghiên cứu nguồn gốc hóa thạch người",
        "visualBreakdown": "Palaeo- (cổ xưa) + anthrop- + logy",
        "ieltsSentence": "Palaeoanthropology utilizes genetic sequencing to reconstruct hominid lineage branchings.",
        "vietnameseTranslation": "Cổ nhân chủng học sử dụng giải trình tự gen để tái dựng các phân nhánh dòng dõi vượn người cổ.",
        "level": "C2",
        "collocation": "Palaeoanthropological discovery / Study palaeoanthropology"
      },
      {
        "word": "Demography",
        "partOfSpeech": "n",
        "meaning": "Ngành nhân khẩu học",
        "visualBreakdown": "Demo- (dân số) + graphy (ghi chép)",
        "ieltsSentence": "Changing demography requires adaptive urban schooling and housing realignments.",
        "vietnameseTranslation": "Nhân khẩu học biến đổi đòi hỏi sự điều chỉnh thích ứng về trường học và nhà ở đô thị.",
        "level": "C1",
        "collocation": "Shift in demography / Understand demography"
      },
      {
        "word": "Philanthropist",
        "partOfSpeech": "n",
        "meaning": "Nhà hảo tâm, người làm từ thiện lớn",
        "visualBreakdown": "Phil- + anthrop- + -ist",
        "ieltsSentence": "The benevolent philanthropist bequeathed millions to fund global vaccine discovery.",
        "vietnameseTranslation": "Nhà hảo tâm nhân từ đã để lại hàng triệu đô la để tài trợ cho việc tìm kiếm vắc-xin toàn cầu.",
        "level": "C1",
        "collocation": "Generous philanthropist / Billionaire philanthropist"
      },
      {
        "word": "Demagoguery",
        "partOfSpeech": "n",
        "meaning": "Thuật mị dân, trò kích động chính trị rẻ tiền",
        "visualBreakdown": "Demo- + agogue + -ry",
        "ieltsSentence": "Statesmanship stands in stark juxtaposition to cynical populist demagoguery.",
        "vietnameseTranslation": "Tài kinh bang tế thế đứng ở vị thế tương phản rõ rệt với thuật mị dân dân túy cay độc.",
        "level": "C2",
        "collocation": "Political demagoguery / Resort to demagoguery"
      },
      {
        "word": "Anthropometry",
        "partOfSpeech": "n",
        "meaning": "Nhân trắc học, đo lường kích thước cơ thể người",
        "visualBreakdown": "Anthrop- + metry (đo đạc)",
        "ieltsSentence": "Modern ergonomic workstation design relies on sophisticated anthropometry data sets.",
        "vietnameseTranslation": "Thiết kế máy trạm công thái học hiện đại dựa vào các tập dữ liệu nhân trắc học tinh vi.",
        "level": "C2",
        "collocation": "Forensic anthropometry / Ergonomic anthropometry"
      },
      {
        "word": "Ecosystem-anthropocentrism",
        "partOfSpeech": "n",
        "meaning": "Tư tưởng định vị con người độc tôn trong hệ sinh thái",
        "visualBreakdown": "Eco- + anthropo- + centrism",
        "ieltsSentence": "Philosophers challenge ecosystem-anthropocentrism to safeguard non-human intrinsic rights.",
        "vietnameseTranslation": "Các triết gia thách thức tư tưởng con người độc tôn trong hệ sinh thái để bảo vệ quyền nội tại của các loài phi con người.",
        "level": "C2",
        "collocation": "Rethink anthropocentrism / Beyond anthropocentrism"
      }
    ]
  },
  {
    "id": "stem-arch-crat-reg",
    "root": "ARCH/CRAT/REG-",
    "meaning": "Quyền lực, trật tự, người đứng đầu cai trị",
    "origin": "Gốc Hy Lạp (archein: cai trị/khởi đầu, kratos: sức mạnh) & Latin (regere: cai trị, cai quản)",
    "description": "Trung tâm của quyền uy chính trị, cấu trúc nhà nước, thứ bậc quyền lực và các quy chế điều chỉnh xã hội.",
    "tip": "Nhớ đến Monarchy (quân chủ), Democracy (dân chủ) và Regulation (quy định) – quyền lực thiết lập trật tự.",
    "category": "Trục 3: Con Người, Quản Trị & Thể Chế",
    "axis": "Trục 3",
    "axisTitle": "TRỤC 3: CON NGƯỜI, QUẢN TRỊ & THỂ CHẾ",
    "axisSubtitle": "Society & Governance (Con người & Thể chế)",
    "stemKey": "ARCH/CRAT/REG-",
    "exampleWords": [
      {
        "word": "Hierarchy",
        "partOfSpeech": "n",
        "meaning": "Hệ thống thứ bậc quyền lực, tôn ti trật tự",
        "visualBreakdown": "Hier- (thánh thiêng) + archy (cai trị)",
        "ieltsSentence": "Rigid institutional hierarchies impede horizontal knowledge exchange and agile innovation.",
        "vietnameseTranslation": "Các tôn ti trật tự thể chế cứng nhắc cản trở sự trao đổi tri thức ngang hàng và sự đổi mới linh hoạt.",
        "level": "C1",
        "collocation": "Social hierarchy / Corporate hierarchy"
      },
      {
        "word": "Anarchy",
        "partOfSpeech": "n",
        "meaning": "Tình trạng vô chính phủ, hỗn loạn không pháp luật",
        "visualBreakdown": "An- (không) + archy (người cai trị)",
        "ieltsSentence": "The abrupt breakdown of civic infrastructure plunged the province into near anarchy.",
        "vietnameseTranslation": "Sự sụp đổ đột ngột của cơ sở hạ tầng dân sự đã đẩy tỉnh này vào tình trạng gần như vô chính phủ.",
        "level": "C1",
        "collocation": "Descend into anarchy / State of anarchy"
      },
      {
        "word": "Monarch",
        "partOfSpeech": "n",
        "meaning": "Quốc vương, quân vương nắm quyền",
        "visualBreakdown": "Mon- (duy nhất một) + arch (cai trị)",
        "ieltsSentence": "Constitutional monarchs exercise ceremonial functions under statutory parliamentary oversight.",
        "vietnameseTranslation": "Các quân vương lập hiến thực hiện các chức năng nghi lễ dưới sự giám sát lập pháp của nghị viện.",
        "level": "C1",
        "collocation": "Constitutional monarch / Absolute monarch"
      },
      {
        "word": "Oligarchy",
        "partOfSpeech": "n",
        "meaning": "Chế độ tài phiệt độc quyền đầu sỏ",
        "visualBreakdown": "Olig- (một số ít) + archy (cai trị)",
        "ieltsSentence": "Campaign financing loopholes facilitate the silent consolidation of a corporate oligarchy.",
        "vietnameseTranslation": "Những lỗ hổng trong việc tài trợ chiến dịch tranh cử tạo điều kiện cho sự củng cố ngấm ngầm của một chế độ tài phiệt độc quyền đầu sỏ.",
        "level": "C2",
        "collocation": "Ruling oligarchy / Financial oligarchy"
      },
      {
        "word": "Patriarchy",
        "partOfSpeech": "n",
        "meaning": "Chế độ gia trưởng, phụ hệ thống trị",
        "visualBreakdown": "Patri- (người cha) + archy (cai trị)",
        "ieltsSentence": "Feminist jurisprudence deconstructs the systemic inequities perpetuated by historical patriarchy.",
        "vietnameseTranslation": "Khoa học pháp lý nữ quyền bóc tách những bất bình đẳng mang tính hệ thống bị duy trì bởi chế độ phụ quyền trong lịch sử.",
        "level": "C1",
        "collocation": "Dismantle patriarchy / Entrenched patriarchy"
      },
      {
        "word": "Matriarch",
        "partOfSpeech": "n",
        "meaning": "Mẫu trưởng, người phụ nữ đứng đầu gia tộc",
        "visualBreakdown": "Matri- (người mẹ) + arch (cai trị)",
        "ieltsSentence": "Elephants maintain tightly coordinated clan networks guided by a seasoned elder matriarch.",
        "vietnameseTranslation": "Voi duy trì các mạng lưới đàn phối hợp chặt chẽ dưới sự dẫn dắt của một con voi mẫu trưởng dạn dày kinh nghiệm.",
        "level": "C2",
        "collocation": "Venerable matriarch / Family matriarch"
      },
      {
        "word": "Autocrat",
        "partOfSpeech": "n",
        "meaning": "Kẻ độc tài toàn quyền, chuyên quyền chuyên chế",
        "visualBreakdown": "Auto- (tự thân) + crat (quyền lực)",
        "ieltsSentence": "The ruthless autocrat stifled independent dissent through draconian digital censorship.",
        "vietnameseTranslation": "Kẻ độc tài tàn nhẫn đã bóp nghẹt những ý kiến bất đồng độc lập thông qua việc kiểm duyệt kỹ thuật số hà khắc.",
        "level": "C2",
        "collocation": "Ruthless autocrat / Rule like an autocrat"
      },
      {
        "word": "Plutocracy",
        "partOfSpeech": "n",
        "meaning": "Chế độ tài phiệt, chính thể do giới giàu có thao túng",
        "visualBreakdown": "Pluto- (sự giàu có) + cracy (cai trị)",
        "ieltsSentence": "Critics warn that untamed lobbying transforms democratic republics into functional plutocracies.",
        "vietnameseTranslation": "Các nhà phê bình cảnh báo rằng việc vận động hành lang không bị kiềm chế sẽ biến các nền cộng hòa dân chủ thành các chính thể tài phiệt trên thực tế.",
        "level": "C2",
        "collocation": "Slide into plutocracy / Corporate plutocracy"
      },
      {
        "word": "Technocrat",
        "partOfSpeech": "n",
        "meaning": "Nhà kỹ trị, chuyên gia kỹ thuật nắm quyền quản lý",
        "visualBreakdown": "Techno- (kỹ thuật) + crat (quyền lực)",
        "ieltsSentence": "A cabinet of economic technocrats was appointed to restructure sovereign fiscal debt.",
        "vietnameseTranslation": "Một nội các gồm các nhà kỹ trị kinh tế đã được bổ nhiệm để tái cấu trúc nợ tài khóa quốc gia.",
        "level": "C1",
        "collocation": "Economic technocrat / Appoint technocrats"
      },
      {
        "word": "Bureaucracy",
        "partOfSpeech": "n",
        "meaning": "Bộ máy quan liêu hành chính cồng kềnh",
        "visualBreakdown": "Bureau- (bàn làm việc, văn phòng) + cracy (cai trị)",
        "ieltsSentence": "Labyrinthine municipal bureaucracy dampens entrepreneurial innovation and civic agility.",
        "vietnameseTranslation": "Bộ máy quan liêu đô thị như mê cung làm thui chột sự đổi mới kinh doanh và tính linh hoạt của công dân.",
        "level": "C1",
        "collocation": "Cumbersome bureaucracy / Entrenched bureaucracy"
      },
      {
        "word": "Aristocracy",
        "partOfSpeech": "n",
        "meaning": "Tầng lớp quý tộc dòng dõi thống trị",
        "visualBreakdown": "Aristo- (tốt nhất, cao quý) + cracy (cai trị)",
        "ieltsSentence": "The egalitarian revolution permanently dismantled the feudal prerogatives of landed aristocracy.",
        "vietnameseTranslation": "Cuộc cách mạng bình đẳng đã xóa bỏ vĩnh viễn những đặc quyền phong kiến của tầng lớp quý tộc sở hữu đất đai.",
        "level": "C1",
        "collocation": "Landed aristocracy / Feudal aristocracy"
      },
      {
        "word": "Theocracy",
        "partOfSpeech": "n",
        "meaning": "Chính thể thần quyền, cai trị bằng luật tôn giáo",
        "visualBreakdown": "Theo- (thần thánh) + cracy (cai trị)",
        "ieltsSentence": "In an absolute theocracy, civil legislation must strictly conform to canonical religious scriptures.",
        "vietnameseTranslation": "Trong một chính thể thần quyền tuyệt đối, luật dân sự phải tuân thủ nghiêm ngặt các giáo luật tôn giáo kinh điển.",
        "level": "C2",
        "collocation": "Establish a theocracy / Strict theocracy"
      },
      {
        "word": "Meritocracy",
        "partOfSpeech": "n",
        "meaning": "Chế độ trọng dụng nhân tài dựa trên năng lực",
        "visualBreakdown": "Merit- (xứng đáng, tài năng) + cracy (cai trị)",
        "ieltsSentence": "Proponents assert that standardized testing underpins a genuinely fair educational meritocracy.",
        "vietnameseTranslation": "Những người ủng hộ khẳng định rằng các kỳ thi chuẩn hóa làm nền tảng cho một nền giáo dục trọng dụng nhân tài thực sự công bằng.",
        "level": "C1",
        "collocation": "Genuine meritocracy / Educational meritocracy"
      },
      {
        "word": "Regulate",
        "partOfSpeech": "v",
        "meaning": "Điều tiết, kiểm soát bằng luật định quy chuẩn",
        "visualBreakdown": "Reg- (quy tắc cai quản) + -ulate",
        "ieltsSentence": "Statutory commissions strictly regulate emissions limits for heavy manufacturing facilities.",
        "vietnameseTranslation": "Các ủy ban theo luật định kiểm soát nghiêm ngặt các giới hạn phát thải đối với các cơ sở sản xuất nặng.",
        "level": "C1",
        "collocation": "Strictly regulate / Regulate the market"
      },
      {
        "word": "Regime",
        "partOfSpeech": "n",
        "meaning": "Chế độ chính trị, thể chế quản lý nhà nước",
        "visualBreakdown": "Reg- (cai trị) + -ime",
        "ieltsSentence": "The oppressive military regime faced sweeping multilateral economic sanctions.",
        "vietnameseTranslation": "Chế độ quân sự hà khắc phải đối mặt với các lệnh trừng phạt kinh tế đa phương diện rộng.",
        "level": "C1",
        "collocation": "Authoritarian regime / Overthrow a regime"
      },
      {
        "word": "Regal",
        "partOfSpeech": "adj",
        "meaning": "Mang phong thái vương giả quý phái, uy nghiêm",
        "visualBreakdown": "Reg- (vua chúa cai trị) + -al",
        "ieltsSentence": "The historic cathedral retained an austere and regal architectural majesty.",
        "vietnameseTranslation": "Nhà thờ lịch sử vẫn giữ được vẻ uy nghiêm tráng lệ kiến trúc mang phong thái vương giả và thanh tịnh.",
        "level": "C2",
        "collocation": "Regal splendor / Regal presence"
      },
      {
        "word": "Regent",
        "partOfSpeech": "n",
        "meaning": "Nhiếp chính vương, người thay mặt vua điều hành",
        "visualBreakdown": "Reg- (cai quản) + -ent",
        "ieltsSentence": "The council appointed a seasoned diplomat as regent pending the young sovereign's majority.",
        "vietnameseTranslation": "Hội đồng đã bổ nhiệm một nhà ngoại giao kỳ cựu làm nhiếp chính vương trong khi chờ vị vua trẻ đến tuổi trưởng thành.",
        "level": "C2",
        "collocation": "Appointed as regent / Prince regent"
      },
      {
        "word": "Regicide",
        "partOfSpeech": "n",
        "meaning": "Tội ám sát giết vua chúa",
        "visualBreakdown": "Regi- (vua) + cide (giết)",
        "ieltsSentence": "The execution of King Charles I in 1649 was decried across monarchies as abominable regicide.",
        "vietnameseTranslation": "Việc hành quyết Vua Charles I năm 1649 bị các nền quân chủ lên án là tội giết vua ghê tởm.",
        "level": "C2",
        "collocation": "Act of regicide / Commit regicide"
      },
      {
        "word": "Incorrigible",
        "partOfSpeech": "adj",
        "meaning": "Bất trị, không thể uốn nắn vào khuôn phép",
        "visualBreakdown": "In- (không) + cor- + rig (thẳng, quy chuẩn) + -ible",
        "ieltsSentence": "Despite multiple rehabilitation efforts, the offender displayed an incorrigible disregard for civic statutes.",
        "vietnameseTranslation": "Bất chấp nhiều nỗ lực cải tạo, kẻ phạm tội vẫn thể hiện sự bất trị coi thường các quy chế dân sự.",
        "level": "C2",
        "collocation": "Incorrigible behavior / Incorrigible rogue"
      },
      {
        "word": "Surrogate",
        "partOfSpeech": "adj",
        "meaning": "Thay thế quyền hành, mang thai/đại diện hộ",
        "visualBreakdown": "Sub- (dưới quyền) + rog (hỏi, yêu cầu) + -ate",
        "ieltsSentence": "The ambassador acted as a surrogate decision-maker during the premier's medical incapacitation.",
        "vietnameseTranslation": "Đại sứ đã hành động như một người ra quyết định đại diện thay thế trong thời gian thủ tướng mất khả năng lao động vì y tế.",
        "level": "C1",
        "collocation": "Surrogate mother / Surrogate marker"
      },
      {
        "word": "Derogate",
        "partOfSpeech": "v",
        "meaning": "Hạ thấp uy tín, làm suy giảm giá trị quyền lực",
        "visualBreakdown": "De- (xuống) + rog (yêu cầu) + -ate",
        "ieltsSentence": "Emergency state decrees must never derogate from non-negotiable fundamental human rights.",
        "vietnameseTranslation": "Các sắc lệnh khẩn cấp của nhà nước không bao giờ được làm suy giảm những quyền cơ bản bất khả thương lượng của con người.",
        "level": "C2",
        "collocation": "Derogate from human rights / Derogatory remarks"
      },
      {
        "word": "Interregnum",
        "partOfSpeech": "n",
        "meaning": "Giai đoạn chuyển giao quyền lực khuyết ngôi vương",
        "visualBreakdown": "Inter- (giữa) + regn (vương triều cai trị) + -um",
        "ieltsSentence": "The precarious interregnum sparked bitter skirmishes between rival noble claimants.",
        "vietnameseTranslation": "Giai đoạn gián đoạn vương triều đầy bấp bênh đã làm bùng nổ các cuộc xung đột gay gắt giữa các phe phái quý tộc tranh chấp ngôi báu.",
        "level": "C2",
        "collocation": "Chaotic interregnum / During the interregnum"
      },
      {
        "word": "Sovereign",
        "partOfSpeech": "adj",
        "meaning": "Có chủ quyền tối cao độc lập tự chủ",
        "visualBreakdown": "Super- (tối cao) + regn (cai trị)",
        "ieltsSentence": "Every recognized nation exercises exclusive sovereign jurisdiction within territorial waters.",
        "vietnameseTranslation": "Mọi quốc gia được công nhận đều thực thi quyền tài phán có chủ quyền độc quyền bên trong lãnh hải.",
        "level": "C1",
        "collocation": "Sovereign state / Sovereign debt"
      },
      {
        "word": "Kleptocracy",
        "partOfSpeech": "n",
        "meaning": "Chính thể đạo tặc, chế độ cướp đoạt công quỹ",
        "visualBreakdown": "Klepto- (ăn trộm) + cracy (cai trị)",
        "ieltsSentence": "Whistleblowers unveiled how the kleptocracy siphoned billions into offshore shell corporations.",
        "vietnameseTranslation": "Những người tố giác đã vạch trần cách thức chính thể đạo tặc bòn rút hàng tỷ đô la vào các công ty bình phong ở hải ngoại.",
        "level": "C2",
        "collocation": "Entrenched kleptocracy / Expose a kleptocracy"
      },
      {
        "word": "Anarchist",
        "partOfSpeech": "n",
        "meaning": "Người theo chủ nghĩa vô chính phủ",
        "visualBreakdown": "An- + arch- + -ist",
        "ieltsSentence": "Early twentieth-century anarchists advocated decentralized collective labor federations.",
        "vietnameseTranslation": "Những người theo chủ nghĩa vô chính phủ đầu thế kỷ 20 chủ trương các liên đoàn lao động tập thể phi tập trung.",
        "level": "C1",
        "collocation": "Anarchist movement / Philosophical anarchist"
      }
    ]
  },
  {
    "id": "stem-equ-egal",
    "root": "EQU/EGAL-",
    "meaning": "Công bằng, ngang bằng, cân bằng, bình đẳng",
    "origin": "Gốc Latin (aequus: ngang bằng, phẳng lặng) & Pháp cổ (égal: bình đẳng)",
    "description": "Nền tảng của công lý xã hội, cân bằng sinh thái, ổn định thị trường và phân bổ tài nguyên bình đẳng giữa các thực thể.",
    "tip": "Nhớ đến Equal (công bằng), Equilibrium (trạng thái cân bằng) – mọi bên đều ngang nhau.",
    "category": "Trục 3: Con Người, Quản Trị & Thể Chế",
    "axis": "Trục 3",
    "axisTitle": "TRỤC 3: CON NGƯỜI, QUẢN TRỊ & THỂ CHẾ",
    "axisSubtitle": "Society & Governance (Con người & Thể chế)",
    "stemKey": "EQU/EGAL-",
    "exampleWords": [
      {
        "word": "Equitable",
        "partOfSpeech": "adj",
        "meaning": "Công bằng, hợp tình hợp lý, phân bổ thỏa đáng",
        "visualBreakdown": "Equ- (công bằng) + -it- + -able",
        "ieltsSentence": "Achieving equitable vaccine distribution remains a cornerstone of global public health security.",
        "vietnameseTranslation": "Đạt được sự phân phối vắc-xin công bằng và hợp lý vẫn là nền tảng của an ninh y tế công cộng toàn cầu.",
        "level": "C1",
        "collocation": "Equitable distribution / Equitable access"
      },
      {
        "word": "Equilibrium",
        "partOfSpeech": "n",
        "meaning": "Trạng thái cân bằng động, thế cân bằng sinh thái",
        "visualBreakdown": "Equi- (bằng) + libr (cái cân) + -ium",
        "ieltsSentence": "Anthropogenic deforestation destabilizes the delicate thermal equilibrium of local microclimates.",
        "vietnameseTranslation": "Nạn phá rừng do con người gây ra làm mất ổn định trạng thái cân bằng nhiệt mong manh của vi khí hậu địa phương.",
        "level": "C1",
        "collocation": "Maintain equilibrium / Delicate equilibrium"
      },
      {
        "word": "Equivocate",
        "partOfSpeech": "v",
        "meaning": "Nói mập mờ nước đôi, lảng tránh cam kết",
        "visualBreakdown": "Equi- (ngang nhau) + voc (nói) + -ate",
        "ieltsSentence": "Ministers continued to equivocate regarding explicit timeline commitments for emissions reduction.",
        "vietnameseTranslation": "Các bộ trưởng tiếp tục nói mập mờ nước đôi về các cam kết lộ trình rõ ràng cho việc cắt giảm phát thải.",
        "level": "C2",
        "collocation": "Refuse to equivocate / Equivocate on issues"
      },
      {
        "word": "Egalitarian",
        "partOfSpeech": "adj",
        "meaning": "Bình đẳng xã hội, tin vào quyền bình đẳng cho tất cả",
        "visualBreakdown": "Egal- (bình đẳng) + -itarian",
        "ieltsSentence": "Nordic societies are frequently praised for their egalitarian welfare and educational architecture.",
        "vietnameseTranslation": "Các xã hội Bắc Âu thường xuyên được khen ngợi vì cấu trúc giáo dục và phúc lợi bình đẳng xã hội.",
        "level": "C1",
        "collocation": "Egalitarian society / Egalitarian principles"
      },
      {
        "word": "Iniquity",
        "partOfSpeech": "n",
        "meaning": "Sự bất công tàn nhẫn, hành vi tội lỗi ngang trái",
        "visualBreakdown": "In- (không) + iqu (công bằng) + -ity",
        "ieltsSentence": "Social reformers campaigned courageously against the grave iniquities of bonded servitude.",
        "vietnameseTranslation": "Các nhà cải cách xã hội đã dũng cảm vận động chống lại những sự bất công tàn nhẫn của chế độ nô dịch cưỡng bức.",
        "level": "C2",
        "collocation": "Denounce iniquity / Glaring iniquities"
      },
      {
        "word": "Equanimity",
        "partOfSpeech": "n",
        "meaning": "Sự bình thản điềm tĩnh trước sóng gió",
        "visualBreakdown": "Equ- (bằng phẳng) + anim (tâm trí) + -ity",
        "ieltsSentence": "The seasoned negotiator handled hostile provocations with extraordinary equanimity.",
        "vietnameseTranslation": "Nhà đàm phán kỳ cựu đã xử lý những khiêu khích thù địch với sự bình thản điềm tĩnh phi thường.",
        "level": "C2",
        "collocation": "Accept with equanimity / Preserve equanimity"
      },
      {
        "word": "Equinox",
        "partOfSpeech": "n",
        "meaning": "Hiện tượng điểm phân (ngày đêm dài bằng nhau)",
        "visualBreakdown": "Equi- (bằng) + nox (đêm)",
        "ieltsSentence": "The autumnal equinox heralds the transition to shortened diurnal daylight in temperate latitudes.",
        "vietnameseTranslation": "Hiện tượng thu phân báo hiệu sự chuyển tiếp sang khoảng thời gian ban ngày ngắn lại ở các vĩ độ ôn đới.",
        "level": "C2",
        "collocation": "Vernal equinox / Autumnal equinox"
      },
      {
        "word": "Equivalent",
        "partOfSpeech": "adj",
        "meaning": "Tương đương về giá trị, công năng hoặc cấp độ",
        "visualBreakdown": "Equi- (bằng) + val (giá trị) + -ent",
        "ieltsSentence": "Completing the vocational apprenticeship confers credentials equivalent to a polytechnic diploma.",
        "vietnameseTranslation": "Hoàn thành chương trình học nghề mang lại chứng chỉ tương đương với bằng cao đẳng bách khoa.",
        "level": "C1",
        "collocation": "Roughly equivalent / Equivalent to"
      },
      {
        "word": "Equidistant",
        "partOfSpeech": "adj",
        "meaning": "Cách đều nhau, khoảng cách tương đương",
        "visualBreakdown": "Equi- (bằng) + distant (khoảng cách)",
        "ieltsSentence": "The municipal transit hub was situated equidistant between the residential enclave and industrial zone.",
        "vietnameseTranslation": "Đầu mối giao thông đô thị được đặt cách đều nhau giữa khu dân cư và khu công nghiệp.",
        "level": "C1",
        "collocation": "Equidistant from / Position equidistant"
      },
      {
        "word": "Equate",
        "partOfSpeech": "v",
        "meaning": "Đánh đồng coi cái này ngang bằng với cái kia",
        "visualBreakdown": "Equ- (bằng) + -ate",
        "ieltsSentence": "Commentators should not naively equate material wealth accumulation with human flourishing.",
        "vietnameseTranslation": "Các nhà bình luận không nên ngây thơ đánh đồng việc tích lũy của cải vật chất với sự thăng hoa hạnh phúc của con người.",
        "level": "C1",
        "collocation": "Equate with / Cannot be equated"
      },
      {
        "word": "Inequality",
        "partOfSpeech": "n",
        "meaning": "Sự bất bình đẳng sâu sắc trong xã hội",
        "visualBreakdown": "In- (không) + equal + -ity",
        "ieltsSentence": "Structural inequality throttles intergenerational social mobility for marginalized youth.",
        "vietnameseTranslation": "Bất bình đẳng mang tính cơ cấu bóp nghẹt sự dịch chuyển xã hội giữa các thế hệ đối với thanh thiếu niên yếu thế.",
        "level": "C1",
        "collocation": "Income inequality / Combat inequality"
      },
      {
        "word": "Adequate",
        "partOfSpeech": "adj",
        "meaning": "Đầy đủ, thỏa đáng, vừa vặn theo nhu cầu",
        "visualBreakdown": "Ad- (hướng tới) + equ (ngang bằng) + -ate",
        "ieltsSentence": "Vulnerable households must have adequate access to clean potable water.",
        "vietnameseTranslation": "Các hộ gia đình dễ bị tổn thương phải được tiếp cận đầy đủ thỏa đáng với nước uống sạch sinh hoạt.",
        "level": "C1",
        "collocation": "Adequate resources / Adequate protection"
      },
      {
        "word": "Inadequate",
        "partOfSpeech": "adj",
        "meaning": "Thiếu hụt, không thỏa đáng, không đáp ứng chuẩn",
        "visualBreakdown": "In- (không) + adequate (đầy đủ)",
        "ieltsSentence": "Inadequate drainage infrastructure exacerbated the flash flood devastation in suburban wards.",
        "vietnameseTranslation": "Cơ sở hạ tầng thoát nước không thỏa đáng đã làm trầm trọng thêm sự tàn phá của lũ quét tại các phường ngoại ô.",
        "level": "C1",
        "collocation": "Grossly inadequate / Inadequate preparation"
      },
      {
        "word": "Equilateral",
        "partOfSpeech": "adj",
        "meaning": "Đều cạnh nhau (tam giác đều)",
        "visualBreakdown": "Equi- (bằng) + later (cạnh bên) + -al",
        "ieltsSentence": "The geodesic dome design utilizes rigid equilateral triangle struts for load distribution.",
        "vietnameseTranslation": "Thiết kế mái vòm trắc địa sử dụng các thanh giằng hình tam giác đều cứng vững để phân bổ tải trọng.",
        "level": "C1",
        "collocation": "Equilateral triangle / Geometric symmetry"
      },
      {
        "word": "Equalize",
        "partOfSpeech": "v",
        "meaning": "San bằng, làm cho trở nên đồng đều cân bằng",
        "visualBreakdown": "Equal + -ize",
        "ieltsSentence": "Progressive taxation schemes strive to equalize post-fiscal household purchasing power.",
        "vietnameseTranslation": "Các chương trình thuế lũy tiến phấn đấu san bằng sức mua của các hộ gia đình sau thuế.",
        "level": "C1",
        "collocation": "Equalize opportunities / Equalize the score"
      },
      {
        "word": "Equivalence",
        "partOfSpeech": "n",
        "meaning": "Tính chất tương đương, sự ngang bằng tương đồng",
        "visualBreakdown": "Equi- + val- + -ence",
        "ieltsSentence": "Translators must preserve conceptual equivalence when rendering legal covenants into other tongues.",
        "vietnameseTranslation": "Người dịch phải duy trì tính tương đương về khái niệm khi chuyển ngữ các khế ước pháp lý sang các ngôn ngữ khác.",
        "level": "C1",
        "collocation": "Functional equivalence / Moral equivalence"
      },
      {
        "word": "Unequivocal",
        "partOfSpeech": "adj",
        "meaning": "Rõ ràng dứt khoát, không thể tranh cãi hay bàn cãi",
        "visualBreakdown": "Un- (không) + equivocal (mập mờ)",
        "ieltsSentence": "The climatology consortium issued an unequivocal warning regarding irreversible ocean warming.",
        "vietnameseTranslation": "Hiệp hội khí hậu học đã đưa ra một cảnh báo rõ ràng dứt khoát về tình trạng ấm lên của đại dương không thể đảo ngược.",
        "level": "C2",
        "collocation": "Unequivocal support / Unequivocal evidence"
      },
      {
        "word": "Equipotential",
        "partOfSpeech": "adj",
        "meaning": "Đẳng thế, có thế năng ngang bằng tại mọi điểm",
        "visualBreakdown": "Equi- (bằng) + potential (thế năng)",
        "ieltsSentence": "Charged conductors exhibit equipotential surfaces throughout electrodynamic equilibria.",
        "vietnameseTranslation": "Các vật dẫn tích điện biểu hiện các mặt đẳng thế xuyên suốt các trạng thái cân bằng điện động lực học.",
        "level": "C2",
        "collocation": "Equipotential surface / Equipotential line"
      },
      {
        "word": "Equator",
        "partOfSpeech": "n",
        "meaning": "Đường xích đạo chia đôi địa cầu",
        "visualBreakdown": "Equat- (làm cho bằng nhau) + -or",
        "ieltsSentence": "Tropical rainforest biomes straddle the equator, harboring immense biological richness.",
        "vietnameseTranslation": "Các quần xã sinh vật rừng mưa nhiệt đới nằm vắt ngang đường xích đạo, chứa đựng sự phong phú sinh học khổng lồ.",
        "level": "C1",
        "collocation": "Cross the equator / Geographic equator"
      },
      {
        "word": "Equitation",
        "partOfSpeech": "n",
        "meaning": "Nghệ thuật cưỡi ngựa cân bằng chuẩn mực",
        "visualBreakdown": "Equi- (ngựa, thăng bằng) + -ation",
        "ieltsSentence": "Classical equitation requires sublime physical coordination between rider and steed.",
        "vietnameseTranslation": "Nghệ thuật cưỡi ngựa cổ điển đòi hỏi sự phối hợp thể chất thăng bằng tuyệt đỉnh giữa người cưỡi và chiến mã.",
        "level": "C2",
        "collocation": "Classical equitation / Master equitation"
      },
      {
        "word": "Equiponderant",
        "partOfSpeech": "adj",
        "meaning": "Có trọng lượng ngang bằng nhau, cân sức",
        "visualBreakdown": "Equi- (bằng) + ponder (sức nặng) + -ant",
        "ieltsSentence": "The delicate chemical balance demands precisely equiponderant reagent measurements.",
        "vietnameseTranslation": "Sự cân bằng hóa học tinh vi đòi hỏi các phép đo chất phản ứng có trọng lượng ngang bằng nhau một cách chính xác.",
        "level": "C2",
        "collocation": "Equiponderant masses / Equiponderant balance"
      },
      {
        "word": "Equivocator",
        "partOfSpeech": "n",
        "meaning": "Kẻ nói quanh co, người dùng xảo ngôn lảng tránh",
        "visualBreakdown": "Equivocat- + -or",
        "ieltsSentence": "Voters grew exasperated with the political equivocator who avoided concrete pledges.",
        "vietnameseTranslation": "Cử tri ngày càng bực bội với kẻ chính trị quanh co luôn lảng tránh những cam kết cụ thể.",
        "level": "C2",
        "collocation": "Political equivocator / Habitual equivocator"
      },
      {
        "word": "Egalitarianism",
        "partOfSpeech": "n",
        "meaning": "Chủ nghĩa quân bình, học thuyết bình đẳng triệt để",
        "visualBreakdown": "Egal- + -itarian + -ism",
        "ieltsSentence": "Philosophical egalitarianism posits that all humans possess intrinsic moral dignity.",
        "vietnameseTranslation": "Chủ nghĩa bình đẳng triết học thừa nhận rằng mọi con người đều sở hữu phẩm giá đạo đức nội tại.",
        "level": "C2",
        "collocation": "Radical egalitarianism / Embrace egalitarianism"
      },
      {
        "word": "Equitably",
        "partOfSpeech": "adv",
        "meaning": "Một cách công bằng hợp đạo lý",
        "visualBreakdown": "Equitable + -ly",
        "ieltsSentence": "Municipal funding must be equitably apportioned across all suburban school districts.",
        "vietnameseTranslation": "Kinh phí của thành phố phải được phân bổ một cách công bằng hợp đạo lý trên khắp các khu học chánh ngoại ô.",
        "level": "C1",
        "collocation": "Equitably distributed / Equitably shared"
      },
      {
        "word": "Equitable-sharing",
        "partOfSpeech": "n",
        "meaning": "Cơ chế chia sẻ công bằng lợi ích tài nguyên",
        "visualBreakdown": "Equitable + sharing",
        "ieltsSentence": "The international convention establishes guidelines for the equitable-sharing of genetic resources.",
        "vietnameseTranslation": "Công ước quốc tế thiết lập các hướng dẫn cho cơ chế chia sẻ công bằng các nguồn tài nguyên di truyền.",
        "level": "C2",
        "collocation": "Principle of equitable sharing / Benefit sharing"
      }
    ]
  },
  {
    "id": "stem-jur-jud-leg",
    "root": "JUR/JUD/LEG-",
    "meaning": "Luật pháp, xét xử, quy chuẩn công lý",
    "origin": "Gốc Latin (jus/juris: luật pháp, judicare: phán xét, lex/legis: điều luật ban hành)",
    "description": "Trung tâm của hệ thống tư pháp, tính hợp pháp, trình tự tố tụng và các phán quyết định hình khuôn khổ pháp quyền.",
    "tip": "Nhớ đến Jury (bồi thẩm đoàn), Judge (thẩm phán) và Legal (hợp pháp) – liên quan mật thiết đến công lý và luật pháp.",
    "category": "Trục 3: Con Người, Quản Trị & Thể Chế",
    "axis": "Trục 3",
    "axisTitle": "TRỤC 3: CON NGƯỜI, QUẢN TRỊ & THỂ CHẾ",
    "axisSubtitle": "Society & Governance (Con người & Thể chế)",
    "stemKey": "JUR/JUD/LEG-",
    "exampleWords": [
      {
        "word": "Jurisprudence",
        "partOfSpeech": "n",
        "meaning": "Khoa học pháp lý, triết lý nền tảng của luật học",
        "visualBreakdown": "Juris (luật pháp) + prudence (sự cẩn trọng, thông thái)",
        "ieltsSentence": "Comparative jurisprudence analyzes how diverse sovereign legal traditions define negligence.",
        "vietnameseTranslation": "Khoa học pháp lý so sánh phân tích cách các truyền thống pháp lý có chủ quyền khác nhau định nghĩa sự cẩu thả.",
        "level": "C2",
        "collocation": "Medical jurisprudence / Modern jurisprudence"
      },
      {
        "word": "Judicious",
        "partOfSpeech": "adj",
        "meaning": "Sáng suốt, khôn ngoan, cân nhắc thấu đáo",
        "visualBreakdown": "Judic- (xét xử) + -ious",
        "ieltsSentence": "The judicious deployment of municipal fiscal reserves cushioned the economic downturn.",
        "vietnameseTranslation": "Việc sử dụng sáng suốt các quỹ dự trữ tài khóa thành phố đã giảm bớt tác động của suy thoái kinh tế.",
        "level": "C2",
        "collocation": "Judicious use of resources / Judicious decision"
      },
      {
        "word": "Legitimate",
        "partOfSpeech": "adj",
        "meaning": "Hợp pháp, chính đáng, tuân theo luật chuẩn mực",
        "visualBreakdown": "Legitim- (luật pháp công nhận) + -ate",
        "ieltsSentence": "Citizens harbor legitimate concerns regarding the environmental footprint of heavy manufacturing.",
        "vietnameseTranslation": "Người dân có những mối lo ngại chính đáng về dấu chân môi trường của hoạt động sản xuất nặng.",
        "level": "C1",
        "collocation": "Legitimate concern / Fully legitimate"
      },
      {
        "word": "Legislate",
        "partOfSpeech": "v",
        "meaning": "Lập pháp, ban hành luật chính thức",
        "visualBreakdown": "Legis (luật) + late (đặt ra, mang tới)",
        "ieltsSentence": "Parliament convened in emergency session to legislate nationwide renewable fuel benchmarks.",
        "vietnameseTranslation": "Nghị viện đã triệu tập phiên họp khẩn cấp để ban hành luật chuẩn mực nhiên liệu tái tạo trên toàn quốc.",
        "level": "C1",
        "collocation": "Legislate against / Power to legislate"
      },
      {
        "word": "Perjury",
        "partOfSpeech": "n",
        "meaning": "Tội khai man trước tòa dù đã tuyên thệ",
        "visualBreakdown": "Per- (xuyên tạc, xấu xa) + jur (lời thề luật pháp) + -y",
        "ieltsSentence": "The key prosecution witness was convicted of perjury following the emergence of forensic audio files.",
        "vietnameseTranslation": "Nhân chứng truy tố chủ chốt đã bị kết tội khai man trước tòa sau khi các tệp âm thanh pháp y xuất hiện.",
        "level": "C2",
        "collocation": "Commit perjury / Guilty of perjury"
      },
      {
        "word": "Adjucate",
        "partOfSpeech": "v",
        "meaning": "Phân xử, làm trọng tài phán quyết tranh chấp",
        "visualBreakdown": "Ad- (hướng tới) + judic (xét xử) + -ate",
        "ieltsSentence": "The international maritime tribunal was mandated to adjudicate competing littoral territorial claims.",
        "vietnameseTranslation": "Tòa án hàng hải quốc tế đã được ủy thác để phân xử các yêu sách lãnh thổ ven biển cạnh tranh nhau.",
        "level": "C2",
        "collocation": "Adjudicate disputes / Power to adjudicate"
      },
      {
        "word": "Abjure",
        "partOfSpeech": "v",
        "meaning": "Tuyên thệ từ bỏ, dứt khoát cự tuyệt tín niệm cũ",
        "visualBreakdown": "Ab- (rời xa) + jure (thề)",
        "ieltsSentence": "As a condition of the peace accord, the insurgent faction agreed to abjure armed combat.",
        "vietnameseTranslation": "Như một điều kiện của hiệp định hòa bình, phe nổi dậy đã đồng ý tuyên thệ từ bỏ đấu tranh vũ trang.",
        "level": "C2",
        "collocation": "Abjure violence / Formally abjure"
      },
      {
        "word": "Conjure",
        "partOfSpeech": "v",
        "meaning": "Gợi lên trong tâm trí như làm phép lạ",
        "visualBreakdown": "Con- (cùng) + jure (thề, triệu gọi)",
        "ieltsSentence": "The author's evocative prose conjures vivid imagery of bygone pastoral landscapes.",
        "vietnameseTranslation": "Văn phong gợi cảm của tác giả gợi lên trong tâm trí những hình ảnh sống động về cảnh quan mục đồng thời xa xưa.",
        "level": "C1",
        "collocation": "Conjure up memories / Conjure an image"
      },
      {
        "word": "Jurist",
        "partOfSpeech": "n",
        "meaning": "Chuyên gia luật học, học giả pháp luật lỗi lạc",
        "visualBreakdown": "Jur- (luật pháp) + -ist",
        "ieltsSentence": "Eminent jurists convened to formulate guidelines safeguarding digital consumer rights.",
        "vietnameseTranslation": "Các chuyên gia luật học lỗi lạc đã triệu tập để xây dựng các hướng dẫn bảo vệ quyền lợi người tiêu dùng kỹ thuật số.",
        "level": "C2",
        "collocation": "Distinguished jurist / Constitutional jurist"
      },
      {
        "word": "Judiciary",
        "partOfSpeech": "n",
        "meaning": "Hệ thống tư pháp tòa án trong tam quyền phân lập",
        "visualBreakdown": "Judici- + -ary",
        "ieltsSentence": "An independent judiciary provides an indispensable institutional check against executive excesses.",
        "vietnameseTranslation": "Một hệ thống tư pháp độc lập mang lại sự kiềm chế thể chế không thể thiếu chống lại sự lạm quyền hành pháp.",
        "level": "C1",
        "collocation": "Independent judiciary / Member of the judiciary"
      },
      {
        "word": "Judicial",
        "partOfSpeech": "adj",
        "meaning": "Thuộc về tòa án xét xử và phán quyết tư pháp",
        "visualBreakdown": "Judic- + -ial",
        "ieltsSentence": "The magistrate ordered a comprehensive judicial inquiry into corporate procurement irregularities.",
        "vietnameseTranslation": "Thẩm phán đã ra lệnh mở một cuộc điều tra tư pháp toàn diện về những điều bất thường trong mua sắm doanh nghiệp.",
        "level": "C1",
        "collocation": "Judicial review / Judicial system"
      },
      {
        "word": "Legacy",
        "partOfSpeech": "n",
        "meaning": "Di sản để lại, dấu ấn pháp lý truyền đời",
        "visualBreakdown": "Leg- (giao phó theo di chúc) + -acy",
        "ieltsSentence": "Industrial pollution left an enduring legacy of environmental degradation in mining river basins.",
        "vietnameseTranslation": "Ô nhiễm công nghiệp đã để lại một di sản lâu dài về sự suy thoái môi trường ở các lưu vực sông khai thác mỏ.",
        "level": "C1",
        "collocation": "Enduring legacy / Historical legacy"
      },
      {
        "word": "Legislation",
        "partOfSpeech": "n",
        "meaning": "Hệ thống luật pháp được ban hành chính thức",
        "visualBreakdown": "Legis- (luật) + lat- (ban bố) + -ion",
        "ieltsSentence": "Robust antitrust legislation deters predatory monopolies from strangling fair commercial competition.",
        "vietnameseTranslation": "Luật chống độc quyền mạnh mẽ ngăn chặn các tập đoàn độc quyền chèn ép bóp nghẹt sự cạnh tranh thương mại công bằng.",
        "level": "C1",
        "collocation": "Enact legislation / Environmental legislation"
      },
      {
        "word": "Legislature",
        "partOfSpeech": "n",
        "meaning": "Cơ quan lập pháp, quốc hội nghị viện",
        "visualBreakdown": "Legis- + lat- + -ure",
        "ieltsSentence": "The unicameral legislature ratified statutory reforms mandating carbon accountability.",
        "vietnameseTranslation": "Cơ quan lập pháp đơn viện đã phê chuẩn các cải cách theo luật định bắt buộc trách nhiệm giải trình carbon.",
        "level": "C1",
        "collocation": "State legislature / Elected legislature"
      },
      {
        "word": "Delegate",
        "partOfSpeech": "v",
        "meaning": "Ủy thác quyền hạn pháp lý cho người khác",
        "visualBreakdown": "De- (từ) + leg (chọn, giao theo luật) + -ate",
        "ieltsSentence": "Department heads must learn to delegate operational decisions to regional project managers.",
        "vietnameseTranslation": "Các trưởng bộ phận phải học cách ủy thác các quyết định vận hành cho các giám đốc dự án khu vực.",
        "level": "C1",
        "collocation": "Delegate authority / Delegate responsibility"
      },
      {
        "word": "Privilege",
        "partOfSpeech": "n",
        "meaning": "Đặc quyền, luật riêng áp dụng cho số ít",
        "visualBreakdown": "Privi- (riêng tư) + leg (luật)",
        "ieltsSentence": "Diplomatic immunity is an international privilege intended to facilitate cross-border dialogue.",
        "vietnameseTranslation": "Quyền miễn trừ ngoại giao là một đặc quyền quốc tế nhằm tạo điều kiện thuận lợi cho đối thoại xuyên biên giới.",
        "level": "C1",
        "collocation": "Special privilege / Abuse of privilege"
      },
      {
        "word": "Colleague",
        "partOfSpeech": "n",
        "meaning": "Đồng nghiệp cùng chung hội đoàn pháp lý",
        "visualBreakdown": "Col- (cùng) + league (kết nối luật)",
        "ieltsSentence": "Scholars collaborated closely with international colleagues to evaluate epidemiological datasets.",
        "vietnameseTranslation": "Các học giả đã cộng tác chặt chẽ với các đồng nghiệp quốc tế để đánh giá các tập dữ liệu dịch tễ học.",
        "level": "C1",
        "collocation": "Esteemed colleague / Close colleague"
      },
      {
        "word": "Illegal",
        "partOfSpeech": "adj",
        "meaning": "Trái pháp luật, phi pháp bị cấm",
        "visualBreakdown": "Il- (không) + legal (hợp pháp)",
        "ieltsSentence": "Cross-border surveillance agencies clamped down on illegal wildlife trafficking networks.",
        "vietnameseTranslation": "Các cơ quan giám sát xuyên biên giới đã trấn áp các mạng lưới buôn bán động vật hoang dã trái phép.",
        "level": "C1",
        "collocation": "Illegal conduct / Strictly illegal"
      },
      {
        "word": "Legitimate-rights",
        "partOfSpeech": "n",
        "meaning": "Quyền lợi chính đáng được luật pháp bảo hộ",
        "visualBreakdown": "Legitimate + rights",
        "ieltsSentence": "Labor unions advocate relentlessly for the legitimate-rights of gig-economy freelancers.",
        "vietnameseTranslation": "Các công đoàn lao động không ngừng vận động cho các quyền lợi chính đáng của những người làm việc tự do trong nền kinh tế gig.",
        "level": "C1",
        "collocation": "Safeguard legitimate rights / Exercise rights"
      },
      {
        "word": "Non-judicial",
        "partOfSpeech": "adj",
        "meaning": "Phi tư pháp, hòa giải ngoài tòa án",
        "visualBreakdown": "Non- + judicial",
        "ieltsSentence": "Commercial partners often opt for non-judicial mediation to expedite commercial dispute resolution.",
        "vietnameseTranslation": "Các đối tác thương mại thường chọn biện pháp hòa giải phi tư pháp ngoài tòa án để đẩy nhanh việc giải quyết tranh chấp.",
        "level": "C2",
        "collocation": "Non-judicial dispute resolution / Non-judicial settlement"
      },
      {
        "word": "Juridical",
        "partOfSpeech": "adj",
        "meaning": "Thuộc quyền tư pháp và tố tụng pháp luật",
        "visualBreakdown": "Jur- + dic- + -al",
        "ieltsSentence": "Corporations are recognized as distinct juridical entities possessing statutory obligations.",
        "vietnameseTranslation": "Các tập đoàn được công nhận là các thực thể pháp lý tư pháp riêng biệt sở hữu các nghĩa vụ theo luật định.",
        "level": "C2",
        "collocation": "Juridical entity / Juridical personality"
      },
      {
        "word": "Extrajudicial",
        "partOfSpeech": "adj",
        "meaning": "Ngoài thẩm quyền tư pháp, hành vi phi pháp chế",
        "visualBreakdown": "Extra- (bên ngoài) + judicial",
        "ieltsSentence": "Humanitarian observers documented egregious extrajudicial killings perpetrated during civil strife.",
        "vietnameseTranslation": "Các quan sát viên nhân đạo đã ghi lại những vụ giết người ngoài thẩm quyền tư pháp ghê tởm xảy ra trong các cuộc xung đột dân sự.",
        "level": "C2",
        "collocation": "Extrajudicial execution / Extrajudicial measures"
      },
      {
        "word": "Juror",
        "partOfSpeech": "n",
        "meaning": "Bồi thẩm viên tuyên thệ trước tòa",
        "visualBreakdown": "Jur- (tuyên thệ) + -or",
        "ieltsSentence": "Prospective jurors undergo rigorous vetting to eliminate prospective ideological bias.",
        "vietnameseTranslation": "Các bồi thẩm viên tương lai phải trải qua quá trình kiểm tra nghiêm ngặt để loại trừ những thiên kiến ý thức hệ tiềm tàng.",
        "level": "C1",
        "collocation": "Prospective juror / Embody juror impartiality"
      },
      {
        "word": "Legitimacy",
        "partOfSpeech": "n",
        "meaning": "Tính chính danh, sự hợp pháp được xã hội thừa nhận",
        "visualBreakdown": "Legitim- + -acy",
        "ieltsSentence": "Electoral transparency reinforces the democratic legitimacy of newly elected regimes.",
        "vietnameseTranslation": "Sự minh bạch trong bầu cử củng cố tính chính danh dân chủ của các chính quyền mới được bầu.",
        "level": "C1",
        "collocation": "Democratic legitimacy / Question the legitimacy"
      },
      {
        "word": "Allegation",
        "partOfSpeech": "n",
        "meaning": "Lời cáo buộc pháp lý đưa ra trước tòa",
        "visualBreakdown": "Ad- + leg- (nói điều kiện luật) + -ation",
        "ieltsSentence": "Regulatory watchdogs probed serious allegations of insider trading within commercial banking firms.",
        "vietnameseTranslation": "Các cơ quan giám sát quản lý đã điều tra những lời cáo buộc nghiêm trọng về giao dịch nội gián trong các ngân hàng thương mại.",
        "level": "C1",
        "collocation": "Serious allegation / Deny allegations"
      }
    ]
  },
  {
    "id": "stem-bio-gen-viv",
    "root": "BIO/GEN/VIV-",
    "meaning": "Sự sống, sinh sôi, phát sinh, biến đổi sinh học",
    "origin": "Gốc Hy Lạp (bios: đời sống, genesis/genos: nguồn gốc, nòi giống) & Latin (vivere: sống)",
    "description": "Các gốc từ cốt lõi mô tả nguồn gốc sự sống, quá trình tiến hóa sinh học, sức sống bền bỉ và sự biến đổi của các loài trong sinh quyển.",
    "tip": "Nhớ đến Biology (sinh học), Generate (tạo ra), Survive/Revive (sống sót/hồi sinh) – tất cả xoay quanh năng lượng sống.",
    "category": "Trục 4: Vận Động, Biến Đổi & Thời Không",
    "axis": "Trục 4",
    "axisTitle": "TRỤC 4: VẬN ĐỘNG, BIẾN ĐỔI & THỜI KHÔNG",
    "axisSubtitle": "Dynamics & Change (Vận động & Biến đổi)",
    "stemKey": "BIO/GEN/VIV-",
    "exampleWords": [
      {
        "word": "Biodiversity",
        "partOfSpeech": "n",
        "meaning": "Đa dạng sinh học, tính phong phú loài trong hệ sinh thái",
        "visualBreakdown": "Bio- (sự sống) + diversity (tính đa dạng)",
        "ieltsSentence": "Industrial runoff inflicts catastrophic impairment upon fragile riverine biodiversity.",
        "vietnameseTranslation": "Nước thải công nghiệp gây ra tổn hại thảm khốc đối với sự đa dạng sinh học mong manh ở lưu vực sông.",
        "level": "C1",
        "collocation": "Biodiversity conservation / Loss of biodiversity"
      },
      {
        "word": "Genesis",
        "partOfSpeech": "n",
        "meaning": "Khởi nguyên, cội nguồn phát sinh của một hiện tượng",
        "visualBreakdown": "Gen- (sinh ra) + -esis",
        "ieltsSentence": "The genesis of the sovereign debt crisis can be traced to reckless subprime deregulation.",
        "vietnameseTranslation": "Khởi nguyên của cuộc khủng hoảng nợ quốc gia có thể bắt nguồn từ việc bãi bỏ quy định cho vay dưới chuẩn một cách thiếu thận trọng.",
        "level": "C2",
        "collocation": "Genesis of an idea / Mark the genesis"
      },
      {
        "word": "Heterogeneous",
        "partOfSpeech": "adj",
        "meaning": "Không đồng nhất, gồm nhiều phần tử đa tạp khác loại",
        "visualBreakdown": "Hetero- (khác biệt) + gen (loại giống) + -ous",
        "ieltsSentence": "Metropolitan enclaves accommodate heterogeneous populations exhibiting divergent linguistic heritages.",
        "vietnameseTranslation": "Các khu vực đô thị đón nhận những quần thể dân cư không đồng nhất với những di sản ngôn ngữ khác biệt nhau.",
        "level": "C1",
        "collocation": "Heterogeneous population / Heterogeneous group"
      },
      {
        "word": "Homogeneous",
        "partOfSpeech": "adj",
        "meaning": "Đồng nhất, thuần nhất về bản chất hoặc thành phần",
        "visualBreakdown": "Homo- (tương tự) + gen (loại) + -ous",
        "ieltsSentence": "Sociologists argue that globalization gradually erodes distinct regional cultures into homogeneous consumerism.",
        "vietnameseTranslation": "Các nhà xã hội học lập luận rằng toàn cầu hóa dần dần làm xói mòn các nền văn hóa khu vực riêng biệt thành chủ nghĩa tiêu dùng thuần nhất.",
        "level": "C1",
        "collocation": "Homogeneous society / Culturally homogeneous"
      },
      {
        "word": "Progeny",
        "partOfSpeech": "n",
        "meaning": "Hậu duệ, dòng dõi con cháu kế tục",
        "visualBreakdown": "Pro- (phía trước) + gen (sinh ra) + -y",
        "ieltsSentence": "Selective breeding programs bequeath genetic resistance to subsequent floral progeny.",
        "vietnameseTranslation": "Các chương trình nhân giống có chọn lọc truyền lại tính kháng di truyền cho thế hệ con cháu thực vật tiếp theo.",
        "level": "C2",
        "collocation": "Direct progeny / Bear progeny"
      },
      {
        "word": "Vivacious",
        "partOfSpeech": "adj",
        "meaning": "Hoạt bát, tràn trề sức sống và nhiệt huyết",
        "visualBreakdown": "Viv- (sống động) + -acious",
        "ieltsSentence": "The lecturer's vivacious discourse galvanized an auditorium of fatigued doctoral researchers.",
        "vietnameseTranslation": "Bài thuyết giảng hoạt bát đầy sức sống của vị giảng viên đã khuấy động cả một khán phòng đầy những nghiên cứu sinh tiến sĩ đang mỏi mệt.",
        "level": "C2",
        "collocation": "Vivacious personality / Vivacious energy"
      },
      {
        "word": "Symbiosis",
        "partOfSpeech": "n",
        "meaning": "Mối quan hệ cộng sinh tương hỗ cùng tồn tại",
        "visualBreakdown": "Sym- (cùng nhau) + bio (sự sống) + -sis",
        "ieltsSentence": "Leguminous crops exhibit metabolic symbiosis with nitrogen-fixing soil bacteria.",
        "vietnameseTranslation": "Các cây họ đậu thể hiện mối quan hệ cộng sinh trao đổi chất với vi khuẩn cố định đạm trong đất.",
        "level": "C1",
        "collocation": "Mutual symbiosis / Delicate symbiosis"
      },
      {
        "word": "Endogenous",
        "partOfSpeech": "adj",
        "meaning": "Nội sinh, phát sinh từ các yếu tố bên trong",
        "visualBreakdown": "Endo- (bên trong) + gen (sinh ra) + -ous",
        "ieltsSentence": "Sustainable macroeconomic stabilization requires endogenous industrial capability rather than foreign donor reliance.",
        "vietnameseTranslation": "Sự ổn định kinh tế vĩ mô bền vững đòi hỏi năng lực công nghiệp nội sinh hơn là sự phụ thuộc vào các nhà tài trợ nước ngoài.",
        "level": "C2",
        "collocation": "Endogenous growth / Endogenous factors"
      },
      {
        "word": "Exogenous",
        "partOfSpeech": "adj",
        "meaning": "Ngoại sinh, bắt nguồn từ các tác nhân bên ngoài",
        "visualBreakdown": "Exo- (bên ngoài) + gen (sinh ra) + -ous",
        "ieltsSentence": "Emerging economies suffered severe volatility due to unexpected exogenous monetary shocks.",
        "vietnameseTranslation": "Các nền kinh tế mới nổi chịu sự biến động nghiêm trọng do những cú sốc tiền tệ ngoại sinh bất ngờ từ bên ngoài.",
        "level": "C2",
        "collocation": "Exogenous shock / Exogenous variable"
      },
      {
        "word": "Convivial",
        "partOfSpeech": "adj",
        "meaning": "Thân thiện, chan hòa, ấm cúng và vui vẻ",
        "visualBreakdown": "Con- (cùng) + viv (sống) + -ial",
        "ieltsSentence": "The intergovernmental summit fostered a convivial atmosphere conducive to bilateral treaty ratification.",
        "vietnameseTranslation": "Hội nghị thượng đỉnh liên chính phủ đã tạo ra một bầu không khí thân thiện chan hòa, thuận lợi cho việc phê chuẩn hiệp ước song phương.",
        "level": "C2",
        "collocation": "Convivial atmosphere / Convivial gathering"
      },
      {
        "word": "Progenitor",
        "partOfSpeech": "n",
        "meaning": "Tổ tiên khai sinh, người khởi xướng tiền bối",
        "visualBreakdown": "Pro- + gen- + -itor",
        "ieltsSentence": "Alan Turing is universally celebrated as the intellectual progenitor of modern computing theory.",
        "vietnameseTranslation": "Alan Turing được ca tụng rộng rãi như người tiền bối khai sinh ra lý thuyết điện toán hiện đại.",
        "level": "C2",
        "collocation": "Intellectual progenitor / Direct progenitor"
      },
      {
        "word": "Revitalize",
        "partOfSpeech": "v",
        "meaning": "Tái sinh, tiếp thêm sinh khí và phục hồi năng lực",
        "visualBreakdown": "Re- (lại) + vita (sự sống) + -ize",
        "ieltsSentence": "Capital investment in heritage districts successfully revitalized the regional tourism ecosystem.",
        "vietnameseTranslation": "Đầu tư vốn vào các khu di sản đã tái sinh thành công hệ sinh thái du lịch của khu vực.",
        "level": "C1",
        "collocation": "Revitalize the economy / Revitalize neighborhoods"
      },
      {
        "word": "Biofuel",
        "partOfSpeech": "n",
        "meaning": "Nhiên liệu sinh học tái tạo",
        "visualBreakdown": "Bio- (sinh học) + fuel (nhiên liệu)",
        "ieltsSentence": "Aviation consortia investigate advanced biofuels to curtail long-haul carbon emissions footprints.",
        "vietnameseTranslation": "Các tập đoàn hàng không điều tra các loại nhiên liệu sinh học tiên tiến để cắt giảm dấu chân phát thải carbon trên các chuyến bay đường dài.",
        "level": "C1",
        "collocation": "Commercial biofuel / Biofuel production"
      },
      {
        "word": "Viable",
        "partOfSpeech": "adj",
        "meaning": "Khả thi, có khả năng tồn tại và phát triển độc lập",
        "visualBreakdown": "Vi- (sống) + -able",
        "ieltsSentence": "Subsidized solar micro-grids offer a commercially viable solution for remote off-grid hamlets.",
        "vietnameseTranslation": "Các lưới điện mặt trời siêu nhỏ được trợ cấp mang lại một giải pháp khả thi về mặt thương mại cho các thôn bản vùng sâu ngoài lưới điện.",
        "level": "C1",
        "collocation": "Commercially viable / Economically viable"
      },
      {
        "word": "Congenital",
        "partOfSpeech": "adj",
        "meaning": "Bẩm sinh, có sẵn từ thuở lọt lòng",
        "visualBreakdown": "Con- (cùng) + genit (sinh) + -al",
        "ieltsSentence": "Routine neonatal screenings identify congenital metabolic anomalies before onset of chronic distress.",
        "vietnameseTranslation": "Sàng lọc sơ sinh định kỳ giúp xác định các dị tật chuyển hóa bẩm sinh trước khi phát sinh biến chứng mãn tính.",
        "level": "C2",
        "collocation": "Congenital defect / Congenital disorder"
      },
      {
        "word": "Generate",
        "partOfSpeech": "v",
        "meaning": "Tạo ra, phát sinh, sản sinh năng lượng hay giá trị",
        "visualBreakdown": "Gen- (sinh) + -erate",
        "ieltsSentence": "Offshore wind turbines generate renewable power sufficient to illuminate metropolitan grids.",
        "vietnameseTranslation": "Các tuabin gió ngoài khơi tạo ra nguồn điện tái tạo đủ để thắp sáng các lưới điện đô thị lớn.",
        "level": "C1",
        "collocation": "Generate revenue / Generate electricity"
      },
      {
        "word": "Engender",
        "partOfSpeech": "v",
        "meaning": "Gây ra, làm nảy sinh tình cảm hay tình trạng",
        "visualBreakdown": "En- (làm cho) + gender (sinh ra)",
        "ieltsSentence": "Systemic algorithmic bias can engender widespread public skepticism toward automated welfare screening.",
        "vietnameseTranslation": "Định kiến thuật toán mang tính hệ thống có thể làm nảy sinh sự hoài nghi lan rộng của công chúng đối với việc sàng lọc phúc lợi tự động.",
        "level": "C2",
        "collocation": "Engender trust / Engender controversy"
      },
      {
        "word": "Degenerate",
        "partOfSpeech": "v",
        "meaning": "Thoái hóa, suy đồi biến chất sa sút",
        "visualBreakdown": "De- (xuống) + gener (loại, sinh) + -ate",
        "ieltsSentence": "Peaceful grassroots protests must not be permitted to degenerate into lawless civil riot.",
        "vietnameseTranslation": "Các cuộc biểu tình ôn hòa của dân chúng không được phép thoái hóa biến chất thành bạo loạn dân sự vô pháp luật.",
        "level": "C1",
        "collocation": "Degenerate into / Degenerate condition"
      },
      {
        "word": "Vivid",
        "partOfSpeech": "adj",
        "meaning": "Sống động, sắc nét, rõ ràng như thấy tận mắt",
        "visualBreakdown": "Viv- (sống) + -id",
        "ieltsSentence": "The memoirs provide a vivid firsthand chronicle of wartime social dislocation.",
        "vietnameseTranslation": "Tập hồi ký cung cấp một biên niên sử sống động tận mắt về sự xáo trộn xã hội thời chiến.",
        "level": "C1",
        "collocation": "Vivid description / Vivid memory"
      },
      {
        "word": "Survivor",
        "partOfSpeech": "n",
        "meaning": "Người sống sót qua thảm họa tai ương",
        "visualBreakdown": "Sur- (trên) + viv (sống) + -or",
        "ieltsSentence": "Trauma counselors mobilized to administer psychosocial triage to catastrophe survivors.",
        "vietnameseTranslation": "Các chuyên gia tư vấn sang chấn tâm lý đã được huy động để tiến hành phân loại tâm lý xã hội cho những người sống sót sau thảm họa.",
        "level": "C1",
        "collocation": "Sole survivor / Earthquake survivors"
      },
      {
        "word": "Biotechnology",
        "partOfSpeech": "n",
        "meaning": "Công nghệ sinh học ứng dụng",
        "visualBreakdown": "Bio- + techno- + -logy",
        "ieltsSentence": "Agricultural biotechnology pioneers drought-resistant crop genomes for arid developing territories.",
        "vietnameseTranslation": "Công nghệ sinh học nông nghiệp tiên phong phát triển các bộ gen cây trồng chịu hạn cho các vùng lãnh thổ khô hạn đang phát triển.",
        "level": "C1",
        "collocation": "Advance in biotechnology / Modern biotechnology"
      },
      {
        "word": "Pathogen",
        "partOfSpeech": "n",
        "meaning": "Mầm bệnh, tác nhân vi sinh sinh ra bệnh tật",
        "visualBreakdown": "Patho- (bệnh) + gen (sinh ra)",
        "ieltsSentence": "Airborne pathogens proliferate rapidly in poorly ventilated high-density enclosed facilities.",
        "vietnameseTranslation": "Các mầm bệnh lây qua không khí sinh sôi nhanh chóng trong các cơ sở kín có mật độ cao và thông gió kém.",
        "level": "C1",
        "collocation": "Deadly pathogen / Airborne pathogen"
      },
      {
        "word": "Biochemical",
        "partOfSpeech": "adj",
        "meaning": "Hóa sinh, thuộc về phản ứng hóa học sự sống",
        "visualBreakdown": "Bio- + chemical",
        "ieltsSentence": "Cellular respiration constitutes an intricate cascade of enzymatic biochemical reactions.",
        "vietnameseTranslation": "Hô hấp tế bào tạo thành một chuỗi phức tạp các phản ứng hóa sinh xúc tác bằng enzyme.",
        "level": "C1",
        "collocation": "Biochemical process / Biochemical pathways"
      },
      {
        "word": "Regeneration",
        "partOfSpeech": "n",
        "meaning": "Sự tái sinh, phục hồi sức sống cho vùng đất/mô",
        "visualBreakdown": "Re- (lại) + gener (sinh) + -ation",
        "ieltsSentence": "Urban regeneration schemes reclaimed derelict docklands for affordable civic housing.",
        "vietnameseTranslation": "Các chương trình tái sinh đô thị đã cải tạo các khu bến tàu bỏ hoang để làm nhà ở xã hội giá cả phải chăng.",
        "level": "C1",
        "collocation": "Urban regeneration / Cellular regeneration"
      },
      {
        "word": "Carcinogen",
        "partOfSpeech": "n",
        "meaning": "Chất sinh ung thư, tác nhân gây bệnh nan y",
        "visualBreakdown": "Carcino- (ung thư) + gen (gây ra)",
        "ieltsSentence": "Occupational health inspectors detected hazardous airborne carcinogens inside the smelting foundry.",
        "vietnameseTranslation": "Các thanh tra viên sức khỏe nghề nghiệp đã phát hiện các chất gây ung thư nguy hiểm trong không khí bên trong xưởng đúc luyện kim.",
        "level": "C1",
        "collocation": "Known carcinogen / Environmental carcinogen"
      }
    ]
  },
  {
    "id": "stem-struct-fac-fic",
    "root": "STRUCT/FAC/FIC-",
    "meaning": "Xây dựng, chế tạo, kiến tạo hình thể và thực thi",
    "origin": "Gốc Latin (struere/structus: xây đắp, facere/factus/ficus: làm, chế tạo)",
    "description": "Các gốc từ chủ đạo chỉ hoạt động thi công cơ sở vật chất, sản xuất công nghiệp, thiết kế kiến trúc và kiến tạo thực tiễn.",
    "tip": "Nhớ đến Structure (cấu trúc), Factory (nhà máy chế tạo), Efficient (hiệu quả) – tất cả là hành động xây đắp và làm nên tác phẩm.",
    "category": "Trục 4: Vận Động, Biến Đổi & Thời Không",
    "axis": "Trục 4",
    "axisTitle": "TRỤC 4: VẬN ĐỘNG, BIẾN ĐỔI & THỜI KHÔNG",
    "axisSubtitle": "Dynamics & Change (Vận động & Biến đổi)",
    "stemKey": "STRUCT/FAC/FIC-",
    "exampleWords": [
      {
        "word": "Infrastructure",
        "partOfSpeech": "n",
        "meaning": "Cơ sở hạ tầng kỹ thuật nền tảng của quốc gia",
        "visualBreakdown": "Infra- (phía dưới) + struct (xây dựng) + -ure",
        "ieltsSentence": "Strategic sovereign capital must fund resilient civil transit infrastructure.",
        "vietnameseTranslation": "Vốn chiến lược của quốc gia phải tài trợ cho cơ sở hạ tầng giao thông dân sự có khả năng chống chịu cao.",
        "level": "C1",
        "collocation": "Critical infrastructure / Upgrade infrastructure"
      },
      {
        "word": "Facilitate",
        "partOfSpeech": "v",
        "meaning": "Tạo điều kiện thuận lợi, làm cho công việc dễ dàng",
        "visualBreakdown": "Facil- (dễ dàng) + -itate",
        "ieltsSentence": "Standardized digital border checks facilitate frictionless cross-continental supply flows.",
        "vietnameseTranslation": "Kiểm tra biên giới kỹ thuật số chuẩn hóa tạo điều kiện thuận lợi cho các luồng cung ứng xuyên lục địa diễn ra trơn tru.",
        "level": "C1",
        "collocation": "Facilitate cooperation / Facilitate learning"
      },
      {
        "word": "Constructive",
        "partOfSpeech": "adj",
        "meaning": "Mang tính xây dựng, hữu ích và tích cực",
        "visualBreakdown": "Con- (cùng) + struct (xây) + -ive",
        "ieltsSentence": "Bipartisan committees must engage in constructive dialogue to overcome statutory legislative deadlocks.",
        "vietnameseTranslation": "Các ủy ban lưỡng đảng phải tham gia vào đối thoại mang tính xây dựng để vượt qua những bế tắc lập pháp theo luật định.",
        "level": "C1",
        "collocation": "Constructive feedback / Constructive dialogue"
      },
      {
        "word": "Manufacture",
        "partOfSpeech": "v",
        "meaning": "Sản xuất quy mô lớn bằng máy móc thiết bị",
        "visualBreakdown": "Manu- (tay) + fact (làm, chế tạo) + -ure",
        "ieltsSentence": "Advanced semiconductor consortia manufacture microchips under extreme cleanroom protocols.",
        "vietnameseTranslation": "Các tập đoàn bán dẫn tiên tiến sản xuất vi mạch theo các quy trình phòng sạch cực kỳ nghiêm ngặt.",
        "level": "C1",
        "collocation": "Manufacture goods / Precision manufacturing"
      },
      {
        "word": "Destruction",
        "partOfSpeech": "n",
        "meaning": "Sự phá hủy, tàn phá làm sụp đổ cấu trúc",
        "visualBreakdown": "De- (xuống) + struct (xây) + -ion",
        "ieltsSentence": "Unregulated strip mining results in irreparable habitat destruction across tropical watersheds.",
        "vietnameseTranslation": "Khai thác mỏ lộ thiên không được kiểm soát dẫn đến sự phá hủy môi trường sống không thể phục hồi khắp các lưu vực sông nhiệt đới.",
        "level": "C1",
        "collocation": "Environmental destruction / Weapons of mass destruction"
      },
      {
        "word": "Benefactor",
        "partOfSpeech": "n",
        "meaning": "Nhà ân nhân, người làm điều thiện hảo tâm",
        "visualBreakdown": "Bene- (tốt lành) + fact (làm) + -or",
        "ieltsSentence": "An anonymous civic benefactor donated endowment funds for the university genomics library.",
        "vietnameseTranslation": "Một nhà ân nhân dân sự ẩn danh đã quyên góp quỹ hiến tặng cho thư viện bộ gen của trường đại học.",
        "level": "C2",
        "collocation": "Generous benefactor / Secret benefactor"
      },
      {
        "word": "Malefactor",
        "partOfSpeech": "n",
        "meaning": "Kẻ làm điều ác, tội phạm gây hại xã hội",
        "visualBreakdown": "Male- (xấu xa) + fact (làm) + -or",
        "ieltsSentence": "Judicial authorities pledged that corporate malefactors would face severe penal incarceration.",
        "vietnameseTranslation": "Các cơ quan tư pháp cam kết rằng những kẻ phạm tội doanh nghiệp sẽ phải đối mặt với án tù hình sự nghiêm khắc.",
        "level": "C2",
        "collocation": "Punish malefactors / Corporate malefactor"
      },
      {
        "word": "Artifice",
        "partOfSpeech": "n",
        "meaning": "Sự khéo léo xảo quyệt, mưu mẹo nhân tạo tinh vi",
        "visualBreakdown": "Arti- (nghệ thuật) + fic (chế tạo)",
        "ieltsSentence": "The diplomat pierced through political artifice to address pressing bilateral disputes directly.",
        "vietnameseTranslation": "Nhà ngoại giao đã nhìn xuyên qua những mưu mẹo chính trị tinh vi để giải quyết trực tiếp các tranh chấp song phương cấp bách.",
        "level": "C2",
        "collocation": "Deceptive artifice / Pure artifice"
      },
      {
        "word": "Efficacy",
        "partOfSpeech": "n",
        "meaning": "Hiệu lực, tính hiệu quả thực tế của phương pháp",
        "visualBreakdown": "Ef- (ngoài) + fic (làm ra) + -acy",
        "ieltsSentence": "Double-blind clinical trials confirmed the therapeutic efficacy of the antiviral regimen.",
        "vietnameseTranslation": "Các thử nghiệm lâm sàng mù đôi đã khẳng định hiệu lực điều trị của phác đồ kháng virus.",
        "level": "C1",
        "collocation": "Therapeutic efficacy / Clinical efficacy"
      },
      {
        "word": "Substructure",
        "partOfSpeech": "n",
        "meaning": "Cấu trúc nền móng bên dưới mặt đất",
        "visualBreakdown": "Sub- (dưới) + struct (xây dựng) + -ure",
        "ieltsSentence": "Geotechnical engineers fortified the suspension bridge's concrete substructure against tidal scour.",
        "vietnameseTranslation": "Các kỹ sư địa kỹ thuật đã gia cố cấu trúc nền móng bê tông của cây cầu treo chống lại sự xói mòn của thủy triều.",
        "level": "C2",
        "collocation": "Underground substructure / Concrete substructure"
      },
      {
        "word": "Superstructure",
        "partOfSpeech": "n",
        "meaning": "Kiến trúc thượng tầng bên trên mặt đất/xã hội",
        "visualBreakdown": "Super- (trên) + struct (xây) + -ure",
        "ieltsSentence": "Sociological theorists analyze how the ideological superstructure legitimizes economic relations.",
        "vietnameseTranslation": "Các nhà lý thuyết xã hội học phân tích cách thức kiến trúc thượng tầng ý thức hệ hợp thức hóa các quan hệ kinh tế.",
        "level": "C2",
        "collocation": "Ideological superstructure / Steel superstructure"
      },
      {
        "word": "Artifact",
        "partOfSpeech": "n",
        "meaning": "Hiện vật khảo cổ, đồ tạo tác do bàn tay con người làm",
        "visualBreakdown": "Arti- (kỹ nghệ) + fact (làm ra)",
        "ieltsSentence": "Museum conservators meticulously restored ceramic artifacts unearthed from Bronze Age burial sites.",
        "vietnameseTranslation": "Các chuyên gia bảo tồn bảo tàng đã tỉ mỉ phục chế các đồ tạo tác gốm được khai quật từ các khu mộ táng Thời đại Đồ đồng.",
        "level": "C1",
        "collocation": "Ancient artifact / Cultural artifact"
      },
      {
        "word": "Facsimile",
        "partOfSpeech": "n",
        "meaning": "Bản sao chụp chính xác hoàn hảo nguyên mẫu",
        "visualBreakdown": "Fac- (làm) + simile (giống hệt)",
        "ieltsSentence": "Archivists handled a delicate facsimile of the Magna Carta to protect the fragile original parchment.",
        "vietnameseTranslation": "Các nhà lưu trữ đã xử lý một bản sao chụp chính xác của Đại Hiến chương để bảo vệ tấm da dê gốc mỏng manh.",
        "level": "C2",
        "collocation": "Exact facsimile / Digital facsimile"
      },
      {
        "word": "Deconstruct",
        "partOfSpeech": "v",
        "meaning": "Giải cấu trúc, phân tích bóc tách các lớp ý nghĩa",
        "visualBreakdown": "De- (tách) + con- + struct (xây)",
        "ieltsSentence": "Literary theorists deconstruct historical narratives to unveil covert ideological hegemony.",
        "vietnameseTranslation": "Các nhà lý thuyết văn học giải cấu trúc các câu chuyện lịch sử để vạch trần quyền bá chủ ý thức hệ ngấm ngầm.",
        "level": "C1",
        "collocation": "Deconstruct arguments / Deconstruct assumptions"
      },
      {
        "word": "Instrumental",
        "partOfSpeech": "adj",
        "meaning": "Đóng vai trò phương tiện quyết định để đạt kết quả",
        "visualBreakdown": "In- + stru- (xây đắp, sắp đặt) + -ment- + -al",
        "ieltsSentence": "Multilateral diplomatic treaties were instrumental in averting catastrophic escalation.",
        "vietnameseTranslation": "Các hiệp ước ngoại giao đa phương đã đóng vai trò quyết định trong việc ngăn chặn sự leo thang thảm khốc.",
        "level": "C1",
        "collocation": "Instrumental in / Play an instrumental role"
      },
      {
        "word": "Obstruct",
        "partOfSpeech": "v",
        "meaning": "Gây cản trở, làm tắc nghẽn giao thông/tiến trình",
        "visualBreakdown": "Ob- (chống lại) + struct (xây chắn)",
        "ieltsSentence": "Partisan gridlock threatened to obstruct necessary statutory expenditure approvals.",
        "vietnameseTranslation": "Bế tắc phe phái đe dọa làm cản trở các phê duyệt chi tiêu cần thiết theo luật định.",
        "level": "C1",
        "collocation": "Obstruct justice / Obstruct traffic"
      },
      {
        "word": "Prolific",
        "partOfSpeech": "adj",
        "meaning": "Sáng tác sung mãn, sinh sôi nảy nở dồi dào",
        "visualBreakdown": "Proles (hậu duệ) + fic (làm ra)",
        "ieltsSentence": "The prolific researcher published dozens of seminal treatises on sustainable energy transitions.",
        "vietnameseTranslation": "Nhà nghiên cứu sáng tác sung mãn đã xuất bản hàng chục luận thuyết có ảnh hưởng sâu rộng về chuyển dịch năng lượng bền vững.",
        "level": "C1",
        "collocation": "Prolific writer / Highly prolific"
      },
      {
        "word": "Affection",
        "partOfSpeech": "n",
        "meaning": "Tình cảm gắn bó, sự yêu mến chân thành",
        "visualBreakdown": "Ad- + fect (làm cảm động) + -ion",
        "ieltsSentence": "Civic leaders earned profound public affection through their compassionate disaster stewardship.",
        "vietnameseTranslation": "Các nhà lãnh đạo dân sự đã giành được tình cảm gắn bó sâu sắc của công chúng nhờ sự chỉ đạo khắc phục thảm họa đầy trắc ẩn.",
        "level": "C1",
        "collocation": "Deep affection / Show affection"
      },
      {
        "word": "Defective",
        "partOfSpeech": "adj",
        "meaning": "Bị lỗi, khiếm khuyết trong chế tạo kỹ thuật",
        "visualBreakdown": "De- (thiếu sót) + fect (làm) + -ive",
        "ieltsSentence": "Automotive manufacturers issued voluntary recalls to replace defective brake assembly modules.",
        "vietnameseTranslation": "Các nhà sản xuất ô tô đã ban hành lệnh triệu hồi tự nguyện để thay thế các mô-đun cụm phanh bị lỗi khiếm khuyết.",
        "level": "C1",
        "collocation": "Defective product / Defective equipment"
      },
      {
        "word": "Factor",
        "partOfSpeech": "n",
        "meaning": "Nhân tố cấu thành, yếu tố tác động tạo ra kết quả",
        "visualBreakdown": "Fact (làm nên) + -or",
        "ieltsSentence": "Socioeconomic disparity remains a pivotal risk factor in preventive epidemiology.",
        "vietnameseTranslation": "Sự chênh lệch kinh tế xã hội vẫn là một nhân tố rủi ro then chốt trong dịch tễ học dự phòng.",
        "level": "C1",
        "collocation": "Key factor / Decisive factor"
      },
      {
        "word": "Fictitious",
        "partOfSpeech": "adj",
        "meaning": "Hư cấu, tưởng tượng ra, không có thực tế",
        "visualBreakdown": "Fict- (chế tạo, bịa ra) + -ious",
        "ieltsSentence": "Auditors discovered numerous fictitious invoices manufactured to siphon public infrastructure grants.",
        "vietnameseTranslation": "Các kiểm toán viên đã phát hiện nhiều hóa đơn hư cấu được tạo ra để bòn rút các khoản trợ cấp cơ sở hạ tầng công.",
        "level": "C2",
        "collocation": "Fictitious name / Purely fictitious"
      },
      {
        "word": "Structural",
        "partOfSpeech": "adj",
        "meaning": "Thuộc về cấu trúc cốt lõi, mang tính cơ cấu",
        "visualBreakdown": "Struct- + -ural",
        "ieltsSentence": "Economists recommend sweeping structural adjustments to enhance domestic labor productivity.",
        "vietnameseTranslation": "Các nhà kinh tế khuyến nghị các điều chỉnh mang tính cơ cấu sâu rộng để nâng cao năng suất lao động trong nước.",
        "level": "C1",
        "collocation": "Structural reform / Structural integrity"
      },
      {
        "word": "Restructure",
        "partOfSpeech": "v",
        "meaning": "Tái cơ cấu, cải tổ lại cấu trúc tổ chức",
        "visualBreakdown": "Re- + struct- + -ure",
        "ieltsSentence": "The conglomerate must restructure its regional subsidiaries to curtail soaring operational overhead.",
        "vietnameseTranslation": "Tập đoàn phải tái cơ cấu các công ty con trong khu vực để cắt giảm chi phí vận hành đang tăng vọt.",
        "level": "C1",
        "collocation": "Restructure debt / Restructure an organization"
      },
      {
        "word": "Malfunction",
        "partOfSpeech": "n",
        "meaning": "Sự cố trục trặc kỹ thuật làm ngừng hoạt động",
        "visualBreakdown": "Mal- (xấu) + func- (thực hiện) + -tion",
        "ieltsSentence": "A minor software malfunction precipitated cascading outages across the electrical substation grid.",
        "vietnameseTranslation": "Một sự cố trục trặc phần mềm nhỏ đã gây ra tình trạng mất điện liên hoàn khắp lưới trạm biến áp điện.",
        "level": "C1",
        "collocation": "Technical malfunction / Suffer a malfunction"
      },
      {
        "word": "Deficit",
        "partOfSpeech": "n",
        "meaning": "Thâm hụt cán cân ngân sách hoặc thiếu hụt cán cân",
        "visualBreakdown": "De- (thiếu) + fic- (làm ra) + -it",
        "ieltsSentence": "Chronic current account deficits render the sovereign exchange rate susceptible to speculative raids.",
        "vietnameseTranslation": "Tình trạng thâm hụt tài khoản vãng lai mãn tính khiến tỷ giá hối đoái của quốc gia dễ bị ảnh hưởng bởi các cuộc tấn công đầu cơ.",
        "level": "C1",
        "collocation": "Budget deficit / Trade deficit"
      }
    ]
  },
  {
    "id": "stem-flu-flux",
    "root": "FLU/FLUX-",
    "meaning": "Dòng chảy, lưu chuyển, biến thiên không ngừng",
    "origin": "Gốc Latin (fluere/fluxus: chảy, tuôn trào)",
    "description": "Các gốc từ diễn tả sự lưu chuyển của tiền tệ, sóng di cư, biến thiên tài chính, lưu lượng chất lỏng và biến động khôn lường.",
    "tip": "Nhớ đến Fluid (chất lỏng), Influx (dòng người đổ về), Fluctuate (biến động lên xuống) – mọi thứ luôn luôn chuyển dịch.",
    "category": "Trục 4: Vận Động, Biến Đổi & Thời Không",
    "axis": "Trục 4",
    "axisTitle": "TRỤC 4: VẬN ĐỘNG, BIẾN ĐỔI & THỜI KHÔNG",
    "axisSubtitle": "Dynamics & Change (Vận động & Biến đổi)",
    "stemKey": "FLU/FLUX-",
    "exampleWords": [
      {
        "word": "Fluctuate",
        "partOfSpeech": "v",
        "meaning": "Dao động, biến động lên xuống liên tục thất thường",
        "visualBreakdown": "Fluctu- (sóng biển chảy) + -ate",
        "ieltsSentence": "Commodity market valuations fluctuate wildly during periods of escalating geopolitical hostility.",
        "vietnameseTranslation": "Định giá thị trường hàng hóa dao động dữ dội trong các giai đoạn leo thang thù địch địa chính trị.",
        "level": "C1",
        "collocation": "Fluctuate wildly / Prices fluctuate"
      },
      {
        "word": "Affluent",
        "partOfSpeech": "adj",
        "meaning": "Giàu có dồi dào, tiền bạc dư dả sung túc",
        "visualBreakdown": "Ad- (chảy về) + flu (chảy) + -ent",
        "ieltsSentence": "Affluent residential suburbs exhibit substantially higher per-capita energy consumption rates.",
        "vietnameseTranslation": "Các khu ngoại ô dân cư giàu có dồi dào thể hiện mức tiêu thụ năng lượng bình quân đầu người cao hơn đáng kể.",
        "level": "C1",
        "collocation": "Affluent society / Affluent neighborhood"
      },
      {
        "word": "Influx",
        "partOfSpeech": "n",
        "meaning": "Dòng người/dòng tiền ồ ạt tràn vào đột ngột",
        "visualBreakdown": "In- (vào trong) + flux (dòng chảy)",
        "ieltsSentence": "The coastal tourism hub accommodated an overwhelming seasonal influx of international holidaymakers.",
        "vietnameseTranslation": "Trung tâm du lịch ven biển đã tiếp nhận một dòng khách du lịch quốc tế ồ ạt đổ về theo mùa quá lớn.",
        "level": "C1",
        "collocation": "Massive influx / Influx of capital"
      },
      {
        "word": "Superfluous",
        "partOfSpeech": "adj",
        "meaning": "Thừa thãi, dư thừa vượt mức cần thiết",
        "visualBreakdown": "Super- (vượt trên) + flu (chảy tràn) + -ous",
        "ieltsSentence": "Streamlined administrative protocols eliminate superfluous paperwork and redundant clearance queues.",
        "vietnameseTranslation": "Các quy trình hành chính tinh gọn loại bỏ giấy tờ thừa thãi và các hàng đợi phê duyệt trùng lặp.",
        "level": "C2",
        "collocation": "Superfluous details / Render superfluous"
      },
      {
        "word": "Effluent",
        "partOfSpeech": "n",
        "meaning": "Nước thải công nghiệp xả thẳng ra nguồn nước",
        "visualBreakdown": "Ex- (ra ngoài) + flu (chảy) + -ent",
        "ieltsSentence": "Stricter municipal ordinances prohibit the unauthorized discharge of toxic chemical effluent into inland waterways.",
        "vietnameseTranslation": "Các pháp lệnh đô thị nghiêm ngặt hơn cấm việc xả thải nước thải hóa chất độc hại trái phép vào các tuyến đường thủy nội địa.",
        "level": "C2",
        "collocation": "Toxic effluent / Industrial effluent"
      },
      {
        "word": "Mellifluous",
        "partOfSpeech": "adj",
        "meaning": "Ngọt ngào êm dịu, như dòng mật chảy trôi",
        "visualBreakdown": "Melli- (mật ngọt) + flu (chảy) + -ous",
        "ieltsSentence": "The orator's mellifluous baritone voice captivated the academic assembly.",
        "vietnameseTranslation": "Giọng nam trung ngọt ngào êm dịu của vị diễn giả đã cuốn hút cả hội đồng học thuật.",
        "level": "C2",
        "collocation": "Mellifluous voice / Mellifluous tone"
      },
      {
        "word": "Confluence",
        "partOfSpeech": "n",
        "meaning": "Nơi hợp lưu của hai con sông; sự hội tụ thời cơ",
        "visualBreakdown": "Con- (cùng nhau) + flu (chảy) + -ence",
        "ieltsSentence": "A rare confluence of macro-financial factors triggered an unexpected rally in clean-tech equities.",
        "vietnameseTranslation": "Một sự hội tụ hiếm hoi của các nhân tố tài chính vĩ mô đã kích hoạt đợt tăng giá bất ngờ của các cổ phiếu công nghệ sạch.",
        "level": "C2",
        "collocation": "Confluence of events / At the confluence"
      },
      {
        "word": "Fluidity",
        "partOfSpeech": "n",
        "meaning": "Tính linh hoạt mềm dẻo, dễ thích ứng biến chuyển",
        "visualBreakdown": "Fluid- (chất lỏng) + -ity",
        "ieltsSentence": "Modern remote work arrangements provide geographic fluidity for international knowledge consultants.",
        "vietnameseTranslation": "Các sắp xếp làm việc từ xa hiện đại mang lại tính linh hoạt mềm dẻo về mặt địa lý cho các chuyên gia tư vấn tri thức quốc tế.",
        "level": "C1",
        "collocation": "Social fluidity / Career fluidity"
      },
      {
        "word": "Effluvium",
        "partOfSpeech": "n",
        "meaning": "Mùi hôi thối bốc lên, khí độc tỏa ra từ rác rưởi",
        "visualBreakdown": "Ex- + flu- + -ium",
        "ieltsSentence": "Sanitation crews wore respiratory masks to endure the noxious effluvium emanating from the landfill basin.",
        "vietnameseTranslation": "Các đội vệ sinh phải đeo mặt nạ phòng độc để chịu đựng luồng khí độc hôi thối bốc ra từ lòng bãi rác.",
        "level": "C2",
        "collocation": "Noxious effluvium / Pungent effluvium"
      },
      {
        "word": "Reflux",
        "partOfSpeech": "n",
        "meaning": "Dòng trào ngược trở lại (dạ dày/thủy triều)",
        "visualBreakdown": "Re- (ngược lại) + flux (chảy)",
        "ieltsSentence": "Chronic gastroesophageal reflux damages mucosal tissues along the lower esophageal tract.",
        "vietnameseTranslation": "Tình trạng trào ngược dạ dày thực quản mãn tính làm tổn thương các mô niêm mạc dọc theo đường thực quản dưới.",
        "level": "C1",
        "collocation": "Acid reflux / Tidal reflux"
      },
      {
        "word": "Flux",
        "partOfSpeech": "n",
        "meaning": "Tình trạng biến chuyển không ngừng, bất định",
        "visualBreakdown": "Flux- (dòng chảy)",
        "ieltsSentence": "Global supply chains remain in a state of persistent flux following geopolitical trade reconfigurations.",
        "vietnameseTranslation": "Các chuỗi cung ứng toàn cầu vẫn ở trong tình trạng biến chuyển không ngừng sau những tái cấu trúc thương mại địa chính trị.",
        "level": "C2",
        "collocation": "In a state of flux / Constant flux"
      },
      {
        "word": "Fluent",
        "partOfSpeech": "adj",
        "meaning": "Lưu loát trôi chảy trong diễn đạt và ngôn ngữ",
        "visualBreakdown": "Flu- (chảy) + -ent",
        "ieltsSentence": "Diplomatic emissaries must demonstrate fluent command of host country diplomatic idioms.",
        "vietnameseTranslation": "Các đặc sứ ngoại giao phải thể hiện sự thông thạo lưu loát các thành ngữ ngoại giao của nước sở tại.",
        "level": "C1",
        "collocation": "Fluent in English / Speak fluently"
      },
      {
        "word": "Influence",
        "partOfSpeech": "n",
        "meaning": "Sức ảnh hưởng tác động lan tỏa từ từ",
        "visualBreakdown": "In- (vào trong) + flu (chảy) + -ence",
        "ieltsSentence": "Multinational tech conglomerates exert disproportionate influence over public media discourse.",
        "vietnameseTranslation": "Các tập đoàn công nghệ đa quốc gia thực thi sức ảnh hưởng không cân xứng lên diễn ngôn truyền thông đại chúng.",
        "level": "C1",
        "collocation": "Exert influence / Undue influence"
      },
      {
        "word": "Affluence",
        "partOfSpeech": "n",
        "meaning": "Sự giàu sang phú quý, cảnh phồn vinh của cải",
        "visualBreakdown": "Ad- + flu- + -ence",
        "ieltsSentence": "The rapid expansion of middle-class affluence fuels unprecedented consumer demand for sustainable apparel.",
        "vietnameseTranslation": "Sự mở rộng nhanh chóng của sự giàu sang phú quý tầng lớp trung lưu thúc đẩy nhu cầu tiêu dùng chưa từng có đối với trang phục bền vững.",
        "level": "C1",
        "collocation": "Growing affluence / Symbol of affluence"
      },
      {
        "word": "Defluxion",
        "partOfSpeech": "n",
        "meaning": "Sự chảy xuống của chất lỏng, dịch tiết cơ thể",
        "visualBreakdown": "De- (xuống) + flux (chảy) + -ion",
        "ieltsSentence": "Physicians monitored the continuous defluxion of lymphatic secretions post-surgery.",
        "vietnameseTranslation": "Các bác sĩ đã theo dõi sự chảy xuống liên tục của các chất tiết bạch huyết sau phẫu thuật.",
        "level": "C2",
        "collocation": "Excessive defluxion / Rate of defluxion"
      },
      {
        "word": "Fluorescent",
        "partOfSpeech": "adj",
        "meaning": "Phát huỳnh quang sáng rực khi kích thích bức xạ",
        "visualBreakdown": "Fluor- (chất phát sáng) + -escent",
        "ieltsSentence": "Marine biologists discovered fluorescent bioluminescent deep-sea cnidarians.",
        "vietnameseTranslation": "Các nhà sinh vật biển đã phát hiện ra các loài thích ty bào phát huỳnh quang phát quang sinh học dưới biển sâu.",
        "level": "C1",
        "collocation": "Fluorescent lamp / Fluorescent proteins"
      },
      {
        "word": "Fluoride",
        "partOfSpeech": "n",
        "meaning": "Hợp chất florua bảo vệ men răng",
        "visualBreakdown": "Fluor- + -ide",
        "ieltsSentence": "Controlled water fluoridation reinforces pediatric dental enamel against virulent decay.",
        "vietnameseTranslation": "Việc bổ sung florua có kiểm soát vào nguồn nước giúp củng cố men răng của trẻ em chống lại sâu răng nguy hiểm.",
        "level": "C1",
        "collocation": "Water fluoridation / High fluoride"
      },
      {
        "word": "Fluctuation",
        "partOfSpeech": "n",
        "meaning": "Sự dao động trồi sụt của số liệu/chỉ số",
        "visualBreakdown": "Fluctu- + -ation",
        "ieltsSentence": "Seasonal price fluctuations impose significant budgeting hardships upon agrarian micro-enterprises.",
        "vietnameseTranslation": "Sự dao động giá cả theo mùa gây ra những khó khăn ngân sách đáng kể cho các doanh nghiệp vi mô nông nghiệp.",
        "level": "C1",
        "collocation": "Wild fluctuation / Currency fluctuations"
      },
      {
        "word": "Circumfluent",
        "partOfSpeech": "adj",
        "meaning": "Chảy vòng quanh bao bọc tứ phía như hào nước",
        "visualBreakdown": "Circum- (quanh) + flu (chảy) + -ent",
        "ieltsSentence": "The ancient fortress was insulated by circumfluent moat tributaries.",
        "vietnameseTranslation": "Pháo đài cổ xưa được cô lập an toàn bởi các nhánh hào nước chảy vòng quanh bao bọc tứ phía.",
        "level": "C2",
        "collocation": "Circumfluent waters / Circumfluent tide"
      },
      {
        "word": "Interfluent",
        "partOfSpeech": "adj",
        "meaning": "Chảy hòa vào nhau, đan xen hòa quyện luồng lách",
        "visualBreakdown": "Inter- (giữa) + flu (chảy) + -ent",
        "ieltsSentence": "The wetland ecosystem is maintained by interfluent brackish marsh estuaries.",
        "vietnameseTranslation": "Hệ sinh thái đất ngập nước được duy trì bởi các cửa sông đầm lầy nước lợ chảy hòa vào nhau đan xen.",
        "level": "C2",
        "collocation": "Interfluent currents / Interfluent streams"
      },
      {
        "word": "Fluid",
        "partOfSpeech": "n",
        "meaning": "Chất lưu chất lỏng có tính linh động",
        "visualBreakdown": "Flu- + -id",
        "ieltsSentence": "Hydraulic machinery transmits kinetic power through pressurized industrial fluids.",
        "vietnameseTranslation": "Máy móc thủy lực truyền động năng thông qua các chất lưu công nghiệp được tăng áp.",
        "level": "C1",
        "collocation": "Body fluid / Pressurized fluid"
      },
      {
        "word": "Fluently",
        "partOfSpeech": "adv",
        "meaning": "Một cách trôi chảy lưu loát nhuần nhuyễn",
        "visualBreakdown": "Fluent + -ly",
        "ieltsSentence": "Multilingual diplomats negotiate complex treaties fluently without interpreters.",
        "vietnameseTranslation": "Các nhà ngoại giao đa ngôn ngữ đàm phán các hiệp ước phức tạp một cách trôi chảy lưu loát mà không cần phiên dịch.",
        "level": "C1",
        "collocation": "Speak fluently / Communicate fluently"
      },
      {
        "word": "Influent",
        "partOfSpeech": "n",
        "meaning": "Dòng nước/dòng chất lỏng chảy vào bể xử lý",
        "visualBreakdown": "In- + flu- + -ent",
        "ieltsSentence": "Automated filtration filters remove coarse particulates from untreated municipal influent.",
        "vietnameseTranslation": "Bộ lọc tự động loại bỏ các hạt thô khỏi dòng nước thải đô thị chảy vào chưa được xử lý.",
        "level": "C2",
        "collocation": "Wastewater influent / Rate of influent"
      },
      {
        "word": "Superfluity",
        "partOfSpeech": "n",
        "meaning": "Trạng thái dư dật quá thừa thãi xa xỉ",
        "visualBreakdown": "Super- + flu- + -ity",
        "ieltsSentence": "Minimalist aesthetics reject the ostentatious superfluity of Victorian ornamental parlors.",
        "vietnameseTranslation": "Mỹ học tối giản cự tuyệt sự thừa thãi xa xỉ phô trương của các phòng khách trang trí thời Victoria.",
        "level": "C2",
        "collocation": "Ostentatious superfluity / Superfluity of goods"
      },
      {
        "word": "Re-fluxing",
        "partOfSpeech": "n",
        "meaning": "Kỹ thuật đun hồi lưu tuần hoàn trong hóa học",
        "visualBreakdown": "Re- + flux + -ing",
        "ieltsSentence": "Organic synthesis relies on prolonged re-fluxing to optimize reaction ester yields.",
        "vietnameseTranslation": "Tổng hợp hữu cơ dựa vào quá trình đun hồi lưu kéo dài để tối ưu hóa hiệu suất este phản ứng.",
        "level": "C2",
        "collocation": "Refluxing apparatus / Constant refluxing"
      }
    ]
  },
  {
    "id": "stem-chron-temp",
    "root": "CHRON/TEMP-",
    "meaning": "Thời gian, thời khắc, nhịp điệu thời đại",
    "origin": "Gốc Hy Lạp (chronos: thời gian) & Latin (tempus/temporis: thời gian, thời điểm thích hợp)",
    "description": "Các gốc từ mô tả dòng thời gian lịch sử, thứ tự thời gian, tính tạm thời ngắn ngủi, nhịp sinh học và sự đồng bộ thời đại.",
    "tip": "Nhớ đến Chronology (niên biểu), Temporary (tạm thời) và Contemporary (đương đại) – thước đo thời gian và lịch sử.",
    "category": "Trục 4: Vận Động, Biến Đổi & Thời Không",
    "axis": "Trục 4",
    "axisTitle": "TRỤC 4: VẬN ĐỘNG, BIẾN ĐỔI & THỜI KHÔNG",
    "axisSubtitle": "Dynamics & Change (Vận động & Biến đổi)",
    "stemKey": "CHRON/TEMP-",
    "exampleWords": [
      {
        "word": "Chronological",
        "partOfSpeech": "adj",
        "meaning": "Theo thứ tự thời gian tuyến tính tuần tự",
        "visualBreakdown": "Chrono- (thời gian) + log (trật tự, từ) + -ical",
        "ieltsSentence": "The museum arranged maritime artifacts in strict chronological progression.",
        "vietnameseTranslation": "Bảo tàng đã sắp xếp các hiện vật hàng hải theo trình tự thời gian nghiêm ngặt.",
        "level": "C1",
        "collocation": "Chronological order / Chronological sequence"
      },
      {
        "word": "Contemporary",
        "partOfSpeech": "adj",
        "meaning": "Đương đại, cùng thời kỳ hiện đại",
        "visualBreakdown": "Con- (cùng) + tempor (thời gian) + -ary",
        "ieltsSentence": "Contemporary architectural blueprints prioritize passive thermal insulation over decorative embellishments.",
        "vietnameseTranslation": "Các bản vẽ thiết kế kiến trúc đương đại ưu tiên cách nhiệt thụ động hơn là những chi tiết trang trí diêm dúa.",
        "level": "C1",
        "collocation": "Contemporary society / Contemporary art"
      },
      {
        "word": "Anachronism",
        "partOfSpeech": "n",
        "meaning": "Sự lỗi thời sai lệch niên đại, lạc lõng với thời đại",
        "visualBreakdown": "Ana- (ngược lại) + chron (thời gian) + -ism",
        "ieltsSentence": "Fossil-fuel subsidies are increasingly decried as a perilous economic anachronism.",
        "vietnameseTranslation": "Các khoản trợ cấp nhiên liệu hóa thạch ngày càng bị lên án là một sự lỗi thời sai lệch niên đại kinh tế đầy nguy hiểm.",
        "level": "C2",
        "collocation": "Historical anachronism / Glaring anachronism"
      },
      {
        "word": "Synchronize",
        "partOfSpeech": "v",
        "meaning": "Đồng bộ hóa thời gian, làm cho diễn ra đồng thời",
        "visualBreakdown": "Syn- (cùng) + chron (thời gian) + -ize",
        "ieltsSentence": "Urban traffic engineers synchronize intersection signals to optimize arterial traffic throughput.",
        "vietnameseTranslation": "Các kỹ sư giao thông đô thị đồng bộ hóa tín hiệu tại các giao lộ để tối ưu hóa lưu lượng giao thông trục chính.",
        "level": "C1",
        "collocation": "Synchronize data / Synchronize clocks"
      },
      {
        "word": "Temporal",
        "partOfSpeech": "adj",
        "meaning": "Thuộc về thời gian trần tục thế tục, tạm bợ",
        "visualBreakdown": "Tempor- (thời gian) + -al",
        "ieltsSentence": "Ecologists study the temporal variations in seasonal monsoon precipitation patterns.",
        "vietnameseTranslation": "Các nhà sinh thái học nghiên cứu các biến đổi về mặt thời gian trong các mô hình lượng mưa gió mùa theo mùa.",
        "level": "C2",
        "collocation": "Temporal dimension / Temporal spatial"
      },
      {
        "word": "Extemporaneous",
        "partOfSpeech": "adj",
        "meaning": "Tùy cơ ứng biến ngay tại chỗ không chuẩn bị trước",
        "visualBreakdown": "Ex- (ra ngoài) + tempor (thời gian sẵn) + -aneous",
        "ieltsSentence": "The ambassador delivered an extemporaneous address that deftly diffused escalating border friction.",
        "vietnameseTranslation": "Đại sứ đã có một bài phát biểu tùy cơ ứng biến ngay tại chỗ khéo léo làm dịu đi sự căng thẳng biên giới đang leo thang.",
        "level": "C2",
        "collocation": "Extemporaneous speech / Extemporaneous remarks"
      },
      {
        "word": "Chronic",
        "partOfSpeech": "adj",
        "meaning": "Mãn tính kéo dài kinh niên, thâm căn cố đế",
        "visualBreakdown": "Chron- (thời gian) + -ic",
        "ieltsSentence": "Chronic underfunding severely impairs the operational efficacy of rural clinical dispensaries.",
        "vietnameseTranslation": "Tình trạng thiếu kinh phí mãn tính kéo dài làm suy giảm nghiêm trọng hiệu lực vận hành của các trạm y tế nông thôn.",
        "level": "C1",
        "collocation": "Chronic illness / Chronic shortage"
      },
      {
        "word": "Temporize",
        "partOfSpeech": "v",
        "meaning": "Trì hoãn câu giờ để chờ cơ hội thuận lợi",
        "visualBreakdown": "Tempor- (thời gian) + -ize",
        "ieltsSentence": "Negotiators chose to temporize rather than precipitate an irreconcilable walkout.",
        "vietnameseTranslation": "Các nhà đàm phán đã chọn cách trì hoãn câu giờ thay vì vội vàng đẩy sự việc đến một cuộc bỏ hội đàm không thể hòa giải.",
        "level": "C2",
        "collocation": "Temporize for time / Refuse to temporize"
      },
      {
        "word": "Chronometer",
        "partOfSpeech": "n",
        "meaning": "Đồng hồ bấm giờ chính xác cao trong hàng hải",
        "visualBreakdown": "Chrono- (thời gian) + meter (đo đạc)",
        "ieltsSentence": "The invention of the marine chronometer revolutionized transoceanic navigational accuracy.",
        "vietnameseTranslation": "Việc phát minh ra đồng hồ bấm giờ hàng hải đã cách mạng hóa độ chính xác của ngành hàng hải xuyên đại dương.",
        "level": "C2",
        "collocation": "Marine chronometer / Precision chronometer"
      },
      {
        "word": "Chronicle",
        "partOfSpeech": "n",
        "meaning": "Biên niên sử ghi chép sự kiện theo năm tháng",
        "visualBreakdown": "Chronic- + -le",
        "ieltsSentence": "The scholar compiled a meticulous chronicle documenting rural peasant uprisings.",
        "vietnameseTranslation": "Học giả đã biên soạn một biên niên sử tỉ mỉ ghi chép lại các cuộc nổi dậy của nông dân nông thôn.",
        "level": "C1",
        "collocation": "Historical chronicle / Chronicle of events"
      },
      {
        "word": "Temporary",
        "partOfSpeech": "adj",
        "meaning": "Tạm thời ngắn hạn, chỉ tồn tại trong chốc lát",
        "visualBreakdown": "Tempor- + -ary",
        "ieltsSentence": "Prefabricated shelters provided temporary relief for displaced tsunami survivors.",
        "vietnameseTranslation": "Các nơi trú ẩn tiền chế đã cung cấp sự cứu trợ tạm thời cho những người sống sót sau sóng thần bị mất nhà cửa.",
        "level": "C1",
        "collocation": "Temporary measure / Temporary relief"
      },
      {
        "word": "Synchronous",
        "partOfSpeech": "adj",
        "meaning": "Đồng bộ, diễn ra tại cùng một thời điểm song song",
        "visualBreakdown": "Syn- + chron- + -ous",
        "ieltsSentence": "Distance learning curricula incorporate both synchronous webinars and self-paced offline modules.",
        "vietnameseTranslation": "Chương trình học từ xa kết hợp cả các hội thảo trực tuyến đồng bộ và các mô-đun học ngoại tuyến tự điều chỉnh tốc độ.",
        "level": "C1",
        "collocation": "Synchronous communication / Synchronous learning"
      },
      {
        "word": "Asynchronous",
        "partOfSpeech": "adj",
        "meaning": "Bất đồng bộ, diễn ra không trùng thời điểm",
        "visualBreakdown": "A- (không) + syn- + chron- + -ous",
        "ieltsSentence": "Asynchronous digital collaboration platforms allow distributed global teams to operate across disparate time zones.",
        "vietnameseTranslation": "Các nền tảng cộng tác kỹ thuật số bất đồng bộ cho phép các đội ngũ toàn cầu phân tán làm việc hiệu quả qua các múi giờ khác nhau.",
        "level": "C1",
        "collocation": "Asynchronous communication / Asynchronous transfer"
      },
      {
        "word": "Chronology",
        "partOfSpeech": "n",
        "meaning": "Niên biểu, trật tự diễn tiến sự kiện theo thời gian",
        "visualBreakdown": "Chrono- + -logy",
        "ieltsSentence": "Forensic investigators established a coherent chronology of digital transactions leading to the fraudulent breach.",
        "vietnameseTranslation": "Các nhà điều tra pháp y đã thiết lập một niên biểu mạch lạc về các giao dịch kỹ thuật số dẫn đến vụ xâm nhập gian lận.",
        "level": "C1",
        "collocation": "Establish a chronology / Accurate chronology"
      },
      {
        "word": "Temporarily",
        "partOfSpeech": "adv",
        "meaning": "Một cách tạm thời trong một khoảng thời gian ngắn",
        "visualBreakdown": "Temporary + -ly",
        "ieltsSentence": "The border terminal was temporarily shuttered to accommodate emergency quarantine inspections.",
        "vietnameseTranslation": "Cửa khẩu biên giới đã tạm thời bị đóng cửa để phục vụ công tác kiểm tra cách ly khẩn cấp.",
        "level": "C1",
        "collocation": "Temporarily suspended / Temporarily unavailable"
      },
      {
        "word": "Geochronology",
        "partOfSpeech": "n",
        "meaning": "Địa thời học, khoa học xác định niên đại địa chất trái đất",
        "visualBreakdown": "Geo- (đất) + chrono- + -logy",
        "ieltsSentence": "Isotope geochronology calibrates the radiometric age of Precambrian igneous formations.",
        "vietnameseTranslation": "Địa thời học đồng vị hiệu chuẩn tuổi phóng xạ của các khối đá mácma thời Tiền Cambri.",
        "level": "C2",
        "collocation": "Isotope geochronology / Geochronological dating"
      },
      {
        "word": "Chronobiology",
        "partOfSpeech": "n",
        "meaning": "Nhịp sinh học, khoa học nghiên cứu chu kỳ thời gian sinh học",
        "visualBreakdown": "Chrono- + bio- + -logy",
        "ieltsSentence": "Chronobiology investigates how circadian retinal daylight exposure modulates melatonin hormone secretion.",
        "vietnameseTranslation": "Nhịp sinh học nghiên cứu cách thức việc võng mạc tiếp xúc với ánh sáng ban ngày điều tiết sự tiết hormone melatonin.",
        "level": "C2",
        "collocation": "Field of chronobiology / Chronobiological rhythm"
      },
      {
        "word": "Temporality",
        "partOfSpeech": "n",
        "meaning": "Tính chất thời gian, bản chất tồn tại trong thời gian",
        "visualBreakdown": "Tempor- + -ality",
        "ieltsSentence": "Existential philosophy interrogates human consciousness through the lens of inescapable temporality.",
        "vietnameseTranslation": "Triết học hiện sinh thẩm vấn ý thức con người qua lăng kính của tính chất thời gian không thể trốn tránh.",
        "level": "C2",
        "collocation": "Human temporality / Linear temporality"
      },
      {
        "word": "Chronicity",
        "partOfSpeech": "n",
        "meaning": "Tính chất mãn tính kéo dài của một căn bệnh/tệ nạn",
        "visualBreakdown": "Chronic + -ity",
        "ieltsSentence": "The chronicity of inner-city joblessness requires comprehensive vocational retraining initiatives.",
        "vietnameseTranslation": "Tính chất kéo dài kinh niên của tình trạng thất nghiệp khu vực nội đô đòi hỏi các sáng kiến đào tạo lại nghề toàn diện.",
        "level": "C2",
        "collocation": "Condition of chronicity / Disease chronicity"
      },
      {
        "word": "Pro-tempore",
        "partOfSpeech": "adj",
        "meaning": "Tạm quyền, giữ chức vụ tạm thời trong một thời hạn",
        "visualBreakdown": "Pro (cho) + tempore (thời gian này)",
        "ieltsSentence": "The senior senator was elected president pro-tempore to preside over procedural deliberations.",
        "vietnameseTranslation": "Vị thượng nghị sĩ cao cấp đã được bầu làm chủ tịch tạm quyền để chủ trì các phiên thảo luận thủ tục.",
        "level": "C2",
        "collocation": "President pro-tempore / Appointed pro-tempore"
      },
      {
        "word": "Synchronic",
        "partOfSpeech": "adj",
        "meaning": "Đồng đại, nghiên cứu hiện tượng tại một lát cắt thời gian",
        "visualBreakdown": "Syn- + chron- + -ic",
        "ieltsSentence": "Linguists employ synchronic analysis to evaluate contemporary metropolitan dialect variants.",
        "vietnameseTranslation": "Các nhà ngôn ngữ học sử dụng phân tích đồng đại để đánh giá các biến thể phương ngữ đô thị đương thời.",
        "level": "C2",
        "collocation": "Synchronic linguistics / Synchronic perspective"
      },
      {
        "word": "Diachronic",
        "partOfSpeech": "adj",
        "meaning": "Lịch đại, nghiên cứu sự biến đổi xuyên suốt dòng thời gian",
        "visualBreakdown": "Dia- (xuyên qua) + chron- + -ic",
        "ieltsSentence": "A diachronic study of maritime lexicon reveals centuries of polyglot naval cross-pollination.",
        "vietnameseTranslation": "Một nghiên cứu lịch đại về từ vựng hàng hải cho thấy nhiều thế kỷ giao thoa ngôn ngữ hải quân đa ngữ.",
        "level": "C2",
        "collocation": "Diachronic analysis / Diachronic change"
      },
      {
        "word": "Chronograph",
        "partOfSpeech": "n",
        "meaning": "Thiết bị ghi nhận thời gian bấm giờ cực nhỏ",
        "visualBreakdown": "Chrono- + graph (ghi chép)",
        "ieltsSentence": "The laboratory installed a digital chronograph to document microsecond laser pulse intervals.",
        "vietnameseTranslation": "Phòng thí nghiệm đã lắp đặt một máy ghi thời gian kỹ thuật số để ghi lại các khoảng xung laser tính bằng micro giây.",
        "level": "C2",
        "collocation": "High-precision chronograph / Digital chronograph"
      },
      {
        "word": "Chronicle",
        "partOfSpeech": "v",
        "meaning": "Ghi chép tường thuật lại các biến cố lịch sử",
        "visualBreakdown": "Chronic- + -le",
        "ieltsSentence": "Documentary photojournalists chronicle the harrowing human toll of environmental displacement.",
        "vietnameseTranslation": "Các phóng viên ảnh tài liệu tường thuật ghi chép lại những tổn thất đau thương về con người do mất nơi ở vì môi trường.",
        "level": "C1",
        "collocation": "Chronicle the event / Faithfully chronicle"
      },
      {
        "word": "Synchronicity",
        "partOfSpeech": "n",
        "meaning": "Sự đồng phương tương ứng kỳ diệu, trùng hợp ngẫu nhiên ý nghĩa",
        "visualBreakdown": "Syn- + chron- + -icity",
        "ieltsSentence": "Psychologist Carl Jung posited synchronicity to explain meaningful coincidences lacking direct linear causality.",
        "vietnameseTranslation": "Nhà tâm lý học Carl Jung đã đặt ra khái niệm đồng phương tương ứng để giải thích những sự trùng hợp có ý nghĩa mà không có quan hệ nhân quả tuyến tính trực tiếp.",
        "level": "C2",
        "collocation": "Meaningful synchronicity / Phenomenon of synchronicity"
      }
    ]
  },
{
    "id": "stem-pel-puls",
    "root": "PEL / PULS-",
    "meaning": "Thúc đẩy, lôi kéo, cưỡng ép, tạo lực",
    "origin": "Latin (pellere, pulsus - đẩy, đập)",
    "description": "Biểu thị tác động lực từ bên ngoài hoặc bên trong, buộc đối tượng phải chuyển dịch, hành động hoặc bị xua đuổi.",
    "tip": "Nhớ đến Pulse (nhịp đập) hoặc Compel (bắt buộc) – lực đẩy mạnh mẽ dồn tới.",
    "category": "Trục 5: Xung Động, Tác Động & Buộc Ép",
    "axis": "Trục 5",
    "axisTitle": "TRỤC 5: XUNG ĐỘNG, TÁC ĐỘNG & BUỘC ÉP",
    "axisSubtitle": "Force, Urge & Motion (Áp lực & Chuyển động)",
    "stemKey": "PEL / PULS-",
    "exampleWords": [
      {
        "word": "Compulsory",
        "partOfSpeech": "adj",
        "meaning": "Bắt buộc theo luật/quy định",
        "visualBreakdown": "Com- (cùng) + Puls (đẩy) + -ory (tính từ)",
        "ieltsSentence": "Primary and secondary education should be entirely compulsory and funded by the state.",
        "vietnameseTranslation": "Giáo dục tiểu học và trung học cần phải hoàn toàn bắt buộc và được nhà nước tài trợ.",
        "level": "C1",
        "collocation": "Compulsory education / Compulsory attendance"
      },
      {
        "word": "Impulsive",
        "partOfSpeech": "adj",
        "meaning": "Bột phát theo cảm tính, bốc đồng",
        "visualBreakdown": "Im- (vào trong) + Puls (thúc đẩy) + -ive",
        "ieltsSentence": "Impulsive consumer spending on non-essential luxuries accelerates personal indebtedness.",
        "vietnameseTranslation": "Thói quen chi tiêu bốc đồng vào những món hàng xa xỉ không thiết yếu làm gia tăng nợ nần cá nhân.",
        "level": "C1",
        "collocation": "Impulsive decision / Impulsive spending"
      },
      {
        "word": "Repel",
        "partOfSpeech": "v",
        "meaning": "Đẩy lùi, xua đuổi, cự tuyệt",
        "visualBreakdown": "Re- (ngược lại) + Pel (đẩy)",
        "ieltsSentence": "The innovative textile is engineered to repel water and airborne contaminants.",
        "vietnameseTranslation": "Loại vải dệt cải tiến được thiết kế để đẩy lùi nước và các chất gây ô nhiễm trong không khí.",
        "level": "C1",
        "collocation": "Repel invaders / Repel moisture"
      },
      {
        "word": "Propel",
        "partOfSpeech": "v",
        "meaning": "Đẩy tiến về phía trước, tạo động lực",
        "visualBreakdown": "Pro- (về phía trước) + Pel (đẩy)",
        "ieltsSentence": "Economic incentives and tax breaks propel the industrial transition toward green energy.",
        "vietnameseTranslation": "Các khuyến khích kinh tế và ưu đãi thuế đẩy mạnh quá trình chuyển đổi công nghiệp hướng tới năng lượng xanh.",
        "level": "C1",
        "collocation": "Propel economic growth / Propel innovation"
      },
      {
        "word": "Compel",
        "partOfSpeech": "v",
        "meaning": "Bắt buộc, thuyết phục không thể chối từ",
        "visualBreakdown": "Com- (hoàn toàn) + Pel (đẩy)",
        "ieltsSentence": "Compelling empirical evidence has forced policymakers to revise carbon emission targets.",
        "vietnameseTranslation": "Bằng chứng thực nghiệm thuyết phục đã buộc các nhà hoạch định chính sách phải điều chỉnh lại mục tiêu phát thải carbon.",
        "level": "C2",
        "collocation": "Compel compliance / Compelling evidence"
      },
      {
        "word": "Dispel",
        "partOfSpeech": "v",
        "meaning": "Xua tan, dập tắt (hoài nghi, ảo tưởng)",
        "visualBreakdown": "Dis- (tản ra) + Pel (đẩy)",
        "ieltsSentence": "Rigorous scientific research is necessary to dispel prevailing public misconceptions about vaccine safety.",
        "vietnameseTranslation": "Nghiên cứu khoa học nghiêm ngặt là cần thiết để xua tan những hiểu lầm phổ biến của công chúng về an toàn vắc xin.",
        "level": "C2",
        "collocation": "Dispel misconceptions / Dispel doubts"
      },
      {
        "word": "Expel",
        "partOfSpeech": "v",
        "meaning": "Trục xuất, thải ra, tống khứ",
        "visualBreakdown": "Ex- (ra ngoài) + Pel (đẩy)",
        "ieltsSentence": "Combustion engines expel substantial quantities of particulate matter into urban atmospheres.",
        "vietnameseTranslation": "Động cơ đốt trong thải ra một lượng đáng kể các hạt bụi mịn vào bầu khí quyển đô thị.",
        "level": "C1",
        "collocation": "Expel pollutants / Expel from institution"
      },
      {
        "word": "Repulsion",
        "partOfSpeech": "n",
        "meaning": "Lực đẩy kháng cự; sự ghê tởm",
        "visualBreakdown": "Re- (lại) + Puls (đẩy) + -ion",
        "ieltsSentence": "Maglev trains harness magnetic repulsion to eliminate friction and achieve unprecedented speeds.",
        "vietnameseTranslation": "Tàu đệm từ khai thác lực đẩy từ trường để loại bỏ ma sát và đạt vận tốc chưa từng có.",
        "level": "C2",
        "collocation": "Magnetic repulsion / Intense repulsion"
      }
    ]
  },
  {
    "id": "stem-tend-tens",
    "root": "TEND / TENS / TENT-",
    "meaning": "Kéo căng, vươn dài, hướng đến, tranh đấu",
    "origin": "Latin (tendere, tentus - kéo căng, vươn ra)",
    "description": "Diễn tả sự vươn dài thể chất hoặc nỗ lực tinh thần căng thẳng hướng tới một mục tiêu, tranh chấp hoặc xu hướng vận động.",
    "tip": "Nhớ đến Tension (sự căng thẳng) hoặc Tendency (xu hướng) – sợi dây đang được kéo dãn hết mức.",
    "category": "Trục 5: Xung Động, Tác Động & Buộc Ép",
    "axis": "Trục 5",
    "axisTitle": "TRỤC 5: XUNG ĐỘNG, TÁC ĐỘNG & BUỘC ÉP",
    "axisSubtitle": "Force, Urge & Motion (Căng thẳng & Xu hướng)",
    "stemKey": "TEND / TENS-",
    "exampleWords": [
      {
        "word": "Extend",
        "partOfSpeech": "v",
        "meaning": "Kéo dài ra ngoài, gia hạn, mở rộng",
        "visualBreakdown": "Ex- (ra ngoài) + Tend (kéo dãn)",
        "ieltsSentence": "The academic committee agreed to extend the thesis deadline in light of unforeseen technical issues.",
        "vietnameseTranslation": "Hội đồng học thuật đã đồng ý gia hạn thời hạn nộp luận văn do các sự cố kỹ thuật ngoài dự kiến.",
        "level": "C1",
        "collocation": "Extend deadline / Extend coverage"
      },
      {
        "word": "Contend",
        "partOfSpeech": "v",
        "meaning": "Quả quyết, tranh biện luận điểm; đương đầu",
        "visualBreakdown": "Con- (cùng) + Tend (giằng co, căng ra)",
        "ieltsSentence": "Prominent sociologists contend that income inequality directly correlates with rising crime rates.",
        "vietnameseTranslation": "Các nhà xã hội học lỗi lạc quả quyết rằng bất bình đẳng thu nhập có mối tương quan trực tiếp với tỷ lệ tội phạm gia tăng.",
        "level": "C1",
        "collocation": "Contend that / Contend with adversity"
      },
      {
        "word": "Intensify",
        "partOfSpeech": "v",
        "meaning": "Gia tăng mãnh liệt, trở nên gay gắt",
        "visualBreakdown": "In- (trong) + Tens (căng) + -ify (làm cho)",
        "ieltsSentence": "Rapid urbanization is projected to intensify competitive pressure on finite water resources.",
        "vietnameseTranslation": "Đô thị hóa nhanh chóng được dự báo sẽ làm gia tăng áp lực cạnh tranh gay gắt lên nguồn nước hữu hạn.",
        "level": "C1",
        "collocation": "Intensify pressure / Intensify efforts"
      },
      {
        "word": "Contentious",
        "partOfSpeech": "adj",
        "meaning": "Gây nhiều tranh cãi nảy lửa",
        "visualBreakdown": "Con- (cùng) + Tent (giằng co) + -ious",
        "ieltsSentence": "The implementation of genetic editing in human embryos remains a profoundly contentious issue.",
        "vietnameseTranslation": "Việc áp dụng chỉnh sửa gen trên phôi người vẫn là một vấn đề gây tranh cãi sâu sắc.",
        "level": "C2",
        "collocation": "Contentious debate / Highly contentious topic"
      },
      {
        "word": "Ostensible",
        "partOfSpeech": "adj",
        "meaning": "Bề ngoài có vẻ như vậy nhưng thực chất khác",
        "visualBreakdown": "Ob- (trước mặt) + Tens (căng ra khoe) + -ible",
        "ieltsSentence": "The ostensible purpose of the subsidy was ecological, yet critics claim it purely benefited corporate lobbies.",
        "vietnameseTranslation": "Mục đích bề ngoài của khoản trợ cấp là vì sinh thái, nhưng các nhà phê bình khẳng định nó phục vụ cho các nhóm lợi ích tập đoàn.",
        "level": "C2",
        "collocation": "Ostensible motive / Ostensible reason"
      },
      {
        "word": "Portend",
        "partOfSpeech": "v",
        "meaning": "Báo hiệu, cảnh báo điềm xấu phía trước",
        "visualBreakdown": "Por- (về phía trước) + Tend (vươn ra)",
        "ieltsSentence": "Prolonged meteorological droughts portend severe disruptions to agrarian supply chains.",
        "vietnameseTranslation": "Hạn hán khí tượng kéo dài báo hiệu những xáo trộn nghiêm trọng đối với chuỗi cung ứng nông nghiệp.",
        "level": "C2",
        "collocation": "Portend disaster / Portend ominous changes"
      },
      {
        "word": "Distend",
        "partOfSpeech": "v",
        "meaning": "Trương phình ra, giãn nở quá mức",
        "visualBreakdown": "Dis- (tách ra) + Tend (kéo căng)",
        "ieltsSentence": "Excessive public borrowing threatens to distend the national budget deficit beyond manageable thresholds.",
        "vietnameseTranslation": "Vay nợ công quá mức đe dọa sẽ làm phình to mức thâm hụt ngân sách quốc gia vượt quá ngưỡng kiểm soát.",
        "level": "C2",
        "collocation": "Distend budgets / Distend boundaries"
      },
      {
        "word": "Tenuous",
        "partOfSpeech": "adj",
        "meaning": "Mong manh, yếu ớt, thiếu cơ sở vững chắc",
        "visualBreakdown": "Tenuis (mỏng dính, bị kéo dãn mỏng) + -ous",
        "ieltsSentence": "The speculative link between electromagnetic frequencies and cognitive impairment remains tenuous at best.",
        "vietnameseTranslation": "Mối liên hệ phỏng đoán giữa sóng điện từ và suy giảm nhận thức cùng lắm cũng chỉ là rất mong manh.",
        "level": "C2",
        "collocation": "Tenuous connection / Tenuous grasp"
      }
    ]
  },
  {
    "id": "stem-mit-miss",
    "root": "MIT / MISS-",
    "meaning": "Gửi đi, phóng thích, chuyển giao, cho phép rời đi",
    "origin": "Latin (mittere, missus - gửi đi, bắn ra)",
    "description": "Thể hiện hành động gửi đi tín hiệu, phát thải khí, chuyển giao trách nhiệm hoặc bãi miễn.",
    "tip": "Nhớ đến Mission (sứ mệnh được giao phó) hoặc Transmit (truyền dẫn) – phát đi thông điệp.",
    "category": "Trục 5: Xung Động, Tác Động & Buộc Ép",
    "axis": "Trục 5",
    "axisTitle": "TRỤC 5: XUNG ĐỘNG, TÁC ĐỘNG & BUỘC ÉP",
    "axisSubtitle": "Force, Urge & Motion (Truyền dẫn & Phóng thích)",
    "stemKey": "MIT / MISS-",
    "exampleWords": [
      {
        "word": "Transmit",
        "partOfSpeech": "v",
        "meaning": "Truyền dẫn (sóng, thông tin, mầm bệnh)",
        "visualBreakdown": "Trans- (xuyên qua) + Mit (gửi đi)",
        "ieltsSentence": "Inadequate sanitary infrastructure enables pathogens to transmit rapidly through contaminated drinking water.",
        "vietnameseTranslation": "Cơ sở hạ tầng vệ sinh yếu kém khiến các mầm bệnh lây truyền nhanh chóng qua nguồn nước uống bị ô nhiễm.",
        "level": "C1",
        "collocation": "Transmit pathogens / Transmit signals"
      },
      {
        "word": "Dismissal",
        "partOfSpeech": "n",
        "meaning": "Sự sa thải; sự gạt bỏ một giả thuyết",
        "visualBreakdown": "Dis- (rời khỏi) + Miss (gửi) + -al",
        "ieltsSentence": "The abrupt dismissal of alternative pedagogical models stifles educational innovation in public schools.",
        "vietnameseTranslation": "Sự bác bỏ đột ngột các mô hình sư phạm thay thế kìm hãm sự đổi mới giáo dục tại các trường công lập.",
        "level": "C1",
        "collocation": "Summary dismissal / Dismissal of hypothesis"
      },
      {
        "word": "Intermittent",
        "partOfSpeech": "adj",
        "meaning": "Gián đoạn, lúc có lúc không, chập chờn",
        "visualBreakdown": "Inter- (ở giữa) + Mit (gửi) + -ent",
        "ieltsSentence": "The intermittent nature of solar and wind generation necessitates advanced battery storage solutions.",
        "vietnameseTranslation": "Bản chất gián đoạn của năng lượng mặt trời và gió đòi hỏi các giải pháp lưu trữ pin tiên tiến.",
        "level": "C1",
        "collocation": "Intermittent power supply / Intermittent rainfall"
      },
      {
        "word": "Emit",
        "partOfSpeech": "v",
        "meaning": "Phát ra, thải ra (khí, nhiệt, bức xạ)",
        "visualBreakdown": "E- (ra ngoài) + Mit (gửi)",
        "ieltsSentence": "Thermal power facilities emit copious volumes of greenhouse gases into the troposphere.",
        "vietnameseTranslation": "Các nhà máy nhiệt điện thải ra một khối lượng khổng lồ khí nhà kính vào tầng đối lưu.",
        "level": "C1",
        "collocation": "Emit greenhouse gases / Emit radiation"
      },
      {
        "word": "Remission",
        "partOfSpeech": "n",
        "meaning": "Sự thuyên giảm (bệnh tật); sự miễn giảm",
        "visualBreakdown": "Re- (lại) + Miss (gửi trả) + -ion",
        "ieltsSentence": "Modern oncology treatments have enabled higher proportions of cancer patients to achieve lasting remission.",
        "vietnameseTranslation": "Các liệu pháp ung bướu hiện đại đã giúp tỷ lệ bệnh nhân ung thư đạt được sự thuyên giảm bệnh lâu dài cao hơn.",
        "level": "C2",
        "collocation": "In full remission / Debt remission"
      },
      {
        "word": "Permissible",
        "partOfSpeech": "adj",
        "meaning": "Được phép chấp nhận theo quy chuẩn",
        "visualBreakdown": "Per- (hoàn toàn) + Miss (cho đi) + -ible",
        "ieltsSentence": "Ambient concentrations of airborne particulate matter must not exceed permissible statutory limits.",
        "vietnameseTranslation": "Nồng độ bụi mịn trong không khí xung quanh không được vượt quá giới hạn luật định cho phép.",
        "level": "C1",
        "collocation": "Permissible limit / Permissible exposure"
      },
      {
        "word": "Submissive",
        "partOfSpeech": "adj",
        "meaning": "Quy phục, dễ phục tùng, nhẫn nhục",
        "visualBreakdown": "Sub- (ở dưới) + Miss (gửi mình) + -ive",
        "ieltsSentence": "Authoritarian regimes historically demanded submissive compliance from the civil population.",
        "vietnameseTranslation": "Các chế độ độc tài trong lịch sử từng đòi hỏi sự phục tùng nhẫn nhục từ dân chúng.",
        "level": "C2",
        "collocation": "Submissive attitude / Submissive obedience"
      },
      {
        "word": "Commission",
        "partOfSpeech": "v",
        "meaning": "Ủy thác, đặt hàng công trình nghiên cứu",
        "visualBreakdown": "Com- (cùng) + Miss (gửi giao) + -ion",
        "ieltsSentence": "The ministry commissioned an independent panel to audit the ecological ramifications of dam construction.",
        "vietnameseTranslation": "Bộ đã ủy thác cho một hội đồng độc lập kiểm định những tác động sinh thái của việc xây dựng đập.",
        "level": "C1",
        "collocation": "Commission a report / Commission a study"
      }
    ]
  },
  {
    "id": "stem-tract",
    "root": "TRACT-",
    "meaning": "Kéo, hút, co rút, dẫn dắt",
    "origin": "Latin (trahere, tractus - kéo lê, hút)",
    "description": "Gốc chỉ động tác kéo vật thể, hút tâm trí chú ý, hoặc rút gọn/thu hẹp quy mô.",
    "tip": "Nhớ đến Tractor (máy kéo) hoặc Attract (thu hút) – lực kéo hội tụ hoặc phân tách.",
    "category": "Trục 5: Xung Động, Tác Động & Buộc Ép",
    "axis": "Trục 5",
    "axisTitle": "TRỤC 5: XUNG ĐỘNG, TÁC ĐỘNG & BUỘC ÉP",
    "axisSubtitle": "Force, Urge & Motion (Kéo hút & Co rút)",
    "stemKey": "TRACT-",
    "exampleWords": [
      {
        "word": "Abstract",
        "partOfSpeech": "adj",
        "meaning": "Trừu tượng, tách khỏi cụ thể; bản tóm tắt",
        "visualBreakdown": "Abs- (rời khỏi) + Tract (kéo) $\\rightarrow$ Kéo ra khỏi thực thể cụ thể",
        "ieltsSentence": "Secondary students often struggle to comprehend abstract theoretical models without empirical demonstrations.",
        "vietnameseTranslation": "Học sinh trung học thường gặp khó khăn khi tiếp thu các mô hình lý thuyết trừu tượng nếu thiếu các minh họa thực nghiệm.",
        "level": "C1",
        "collocation": "Abstract concepts / Abstract reasoning"
      },
      {
        "word": "Detract",
        "partOfSpeech": "v",
        "meaning": "Làm giảm giá trị, bớt đi uy tín",
        "visualBreakdown": "De- (xuống) + Tract (kéo)",
        "ieltsSentence": "Occasional grammatical minor slips do not significantly detract from the cogency of candidate essays.",
        "vietnameseTranslation": "Những sai sót ngữ pháp nhỏ không làm giảm đi đáng kể tính thuyết phục của bài luận thí sinh.",
        "level": "C1",
        "collocation": "Detract from merit / Detract from value"
      },
      {
        "word": "Contract",
        "partOfSpeech": "v",
        "meaning": "Co rút lại, thu hẹp quy mô kinh tế",
        "visualBreakdown": "Con- (cùng) + Tract (kéo lại gần)",
        "ieltsSentence": "National manufacturing output contracted by four percent following the geopolitical embargo.",
        "vietnameseTranslation": "Sản lượng sản xuất quốc gia đã co rút lại 4% sau lệnh cấm vận địa chính trị.",
        "level": "C1",
        "collocation": "Contract sharply / Contract an economy"
      },
      {
        "word": "Protracted",
        "partOfSpeech": "adj",
        "meaning": "Kéo dài lê thê một cách mệt mỏi",
        "visualBreakdown": "Pro- (về phía trước) + Tract (kéo dài) + -ed",
        "ieltsSentence": "Protracted litigation between pharmaceutical corporations can impede affordable vaccine distribution.",
        "vietnameseTranslation": "Các vụ kiện tụng kéo dài lê thê giữa các tập đoàn dược phẩm có thể cản trở việc phân phối vắc xin giá rẻ.",
        "level": "C2",
        "collocation": "Protracted conflict / Protracted negotiations"
      },
      {
        "word": "Intractable",
        "partOfSpeech": "adj",
        "meaning": "Nan giải, khó bảo, bất trị",
        "visualBreakdown": "In- (không) + Tract (kéo đi) + -able $\\rightarrow$ Không thể kéo/uốn nắn",
        "ieltsSentence": "Chronic poverty in post-industrial metropolitan pockets represents an intractable governance challenge.",
        "vietnameseTranslation": "Nạn nghèo đói kinh niên ở các khu vực đô thị hậu công nghiệp đại diện cho một thách thức quản trị nan giải.",
        "level": "C2",
        "collocation": "Intractable problem / Intractable dispute"
      },
      {
        "word": "Retract",
        "partOfSpeech": "v",
        "meaning": "Rút lại (lời tuyên bố, bài báo sai sự thật)",
        "visualBreakdown": "Re- (ngược lại) + Tract (kéo về)",
        "ieltsSentence": "The academic journal was forced to retract the study due to fraudulent data manipulation.",
        "vietnameseTranslation": "Tạp chí học thuật buộc phải rút lại bài nghiên cứu do việc thao túng dữ liệu gian lận.",
        "level": "C1",
        "collocation": "Retract a statement / Retract a publication"
      },
      {
        "word": "Extract",
        "partOfSpeech": "v",
        "meaning": "Chiết xuất, khai thác triệt để (tài nguyên)",
        "visualBreakdown": "Ex- (ra ngoài) + Tract (kéo ra)",
        "ieltsSentence": "Advanced mining apparatus enables corporations to extract rare earth minerals with reduced surface disruption.",
        "vietnameseTranslation": "Thiết bị khai khoáng tiên tiến cho phép các tập đoàn chiết xuất khoáng sản đất hiếm với mức độ phá vỡ bề mặt giảm thiểu.",
        "level": "C1",
        "collocation": "Extract resources / Extract vital data"
      },
      {
        "word": "Tractable",
        "partOfSpeech": "adj",
        "meaning": "Dễ điều khiển, dễ xử lý",
        "visualBreakdown": "Tract (kéo dắt) + -able",
        "ieltsSentence": "With targeted artificial intelligence algorithms, massive dataset management becomes substantially more tractable.",
        "vietnameseTranslation": "Với các thuật toán trí tuệ nhân tạo chuyên biệt, việc quản lý tập dữ liệu khổng lồ trở nên dễ xử lý hơn đáng kể.",
        "level": "C2",
        "collocation": "Tractable problem / Tractable solution"
      }
    ]
  },
  {
    "id": "stem-ver-cert",
    "root": "VER / CERT-",
    "meaning": "Chân lý, chính xác, xác thực, đảm bảo",
    "origin": "Latin (verus - sự thật; certus - chắc chắn)",
    "description": "Gốc chỉ sự chân thực không thể chối cãi, việc kiểm định tính chính xác và độ chắc chắn trong học thuật và pháp lý.",
    "tip": "Nhớ đến Verify (xác minh) hoặc Certain (chắc chắn) – sự thật được soi tỏ dưới ánh sáng.",
    "category": "Trục 6: Chân Lý, Đo Lường & Chuẩn Mực",
    "axis": "Trục 6",
    "axisTitle": "TRỤC 6: CHÂN LÝ, ĐO LƯỜNG & CHUẨN MỰC",
    "axisSubtitle": "Truth, Measure & Trust (Sự thật & Xác tín)",
    "stemKey": "VER / CERT-",
    "exampleWords": [
      {
        "word": "Verdict",
        "partOfSpeech": "n",
        "meaning": "Lời phán quyết của tòa án; phán đoán chung cuộc",
        "visualBreakdown": "Ver (sự thật) + Dict (nói) $\\rightarrow$ Lời phán quyết sự thật",
        "ieltsSentence": "The jury delivered an unanimous guilty verdict after deliberating for three consecutive days.",
        "vietnameseTranslation": "Bồi thẩm đoàn đã đưa ra phán quyết có tội đồng thuận sau khi thảo luận trong ba ngày liên tiếp.",
        "level": "C1",
        "collocation": "Deliver a verdict / Final verdict"
      },
      {
        "word": "Verify",
        "partOfSpeech": "v",
        "meaning": "Xác minh, kiểm chứng dữ liệu",
        "visualBreakdown": "Ver (sự thật) + -ify (làm cho)",
        "ieltsSentence": "Investigators must cross-reference digital logs to verify the integrity of financial transactions.",
        "vietnameseTranslation": "Các điều tra viên phải đối chiếu các nhật ký điện tử để xác minh tính toàn vẹn của các giao dịch tài chính.",
        "level": "C1",
        "collocation": "Verify authenticity / Verifiable evidence"
      },
      {
        "word": "Certainty",
        "partOfSpeech": "n",
        "meaning": "Mức độ chắc chắn; sự xác quyết",
        "visualBreakdown": "Cert (chắc chắn) + -ty (danh từ)",
        "ieltsSentence": "Macroeconomic forecasters operate under severe uncertainty regarding fossil fuel price volatility.",
        "vietnameseTranslation": "Các nhà dự báo kinh tế vĩ mô hoạt động dưới sự bất định nghiêm trọng về biến động giá nhiên liệu hóa thạch.",
        "level": "C1",
        "collocation": "Absolute certainty / Degree of certainty"
      },
      {
        "word": "Veracity",
        "partOfSpeech": "n",
        "meaning": "Tính trung thực, tính xác thực của thông tin",
        "visualBreakdown": "Ver (sự thật) + -acity",
        "ieltsSentence": "Independent fact-checkers are indispensable to evaluate the veracity of viral social media assertions.",
        "vietnameseTranslation": "Các chuyên gia kiểm chứng độc lập là không thể thiếu để đánh giá tính xác thực của các khẳng định lan truyền trên mạng xã hội.",
        "level": "C2",
        "collocation": "Question the veracity / Attest to veracity"
      },
      {
        "word": "Ascertain",
        "partOfSpeech": "v",
        "meaning": "Tìm hiểu cho chắc chắn, làm sáng tỏ",
        "visualBreakdown": "Ad- (tới) + Certain (chắc chắn)",
        "ieltsSentence": "Sociological surveys were orchestrated to ascertain the root causes of metropolitan youth unemployment.",
        "vietnameseTranslation": "Các cuộc điều tra xã hội học đã được tổ chức để làm sáng tỏ nguyên nhân gốc rễ của nạn thất nghiệp ở thanh niên đô thị.",
        "level": "C2",
        "collocation": "Ascertain facts / Ascertain feasibility"
      },
      {
        "word": "Veritable",
        "partOfSpeech": "adj",
        "meaning": "Đích thực, thực sự (dùng để nhấn mạnh)",
        "visualBreakdown": "Ver (sự thật) + -itable",
        "ieltsSentence": "The proliferation of digital libraries has triggered a veritable revolution in autonomous learning.",
        "vietnameseTranslation": "Sự phổ biến của các thư viện số đã kích hoạt một cuộc cách mạng đích thực trong việc tự học.",
        "level": "C2",
        "collocation": "Veritable treasure / Veritable paradise"
      },
      {
        "word": "Certify",
        "partOfSpeech": "v",
        "meaning": "Chứng thực, cấp bằng công nhận tiêu chuẩn",
        "visualBreakdown": "Cert (chắc chắn) + -ify",
        "ieltsSentence": "Agronomists inspect soil samples to certify that organic farms comply with pesticide-free guidelines.",
        "vietnameseTranslation": "Các nhà nông học kiểm tra mẫu đất để chứng thực các trang trại hữu cơ tuân thủ các quy chuẩn không dùng thuốc trừ sâu.",
        "level": "C1",
        "collocation": "Certify compliance / Formally certify"
      },
      {
        "word": "Invariable",
        "partOfSpeech": "adj",
        "meaning": "Bất biến, không bao giờ thay đổi",
        "visualBreakdown": "In- (không) + Variable (thay đổi)",
        "ieltsSentence": "Physical constants represent invariable parameters governing astronomical celestial mechanics.",
        "vietnameseTranslation": "Các hằng số vật lý đại diện cho các thông số bất biến chi phối cơ học thiên thể vũ trụ.",
        "level": "C2",
        "collocation": "Invariable law / Invariable constant"
      }
    ]
  },
  {
    "id": "stem-fid-cred",
    "root": "FID / CRED-",
    "meaning": "Niềm tin, độ tin cậy, uy tín, danh dự",
    "origin": "Latin (fides - niềm tin; credere - tin tưởng)",
    "description": "Gốc từ nền tảng liên quan đến lòng tin học thuật, bằng chứng khả tín, bí mật tín cẩn và tín dụng.",
    "tip": "Nhớ đến Confident (tự tin) hoặc Credible (đáng tin) – xây dựng niềm tin không lay chuyển.",
    "category": "Trục 6: Chân Lý, Đo Lường & Chuẩn Mực",
    "axis": "Trục 6",
    "axisTitle": "TRỤC 6: CHÂN LÝ, ĐO LƯỜNG & CHUẨN MỰC",
    "axisSubtitle": "Truth, Measure & Trust (Niềm tin & Khả tín)",
    "stemKey": "FID / CRED-",
    "exampleWords": [
      {
        "word": "Credible",
        "partOfSpeech": "adj",
        "meaning": "Đáng tin cậy, có thể tin được",
        "visualBreakdown": "Cred (tin) + -ible (có thể)",
        "ieltsSentence": "Scholarly publications must cite credible peer-reviewed literature rather than anonymous web commentary.",
        "vietnameseTranslation": "Các ấn phẩm học thuật phải trích dẫn các tài liệu được bình duyệt đáng tin cậy thay vì các bình luận ẩn danh trên mạng.",
        "level": "C1",
        "collocation": "Credible source / Credible alternative"
      },
      {
        "word": "Confidential",
        "partOfSpeech": "adj",
        "meaning": "Tuyệt mật, bí mật riêng tư",
        "visualBreakdown": "Con- (hoàn toàn) + Fid (niềm tin) + -ential",
        "ieltsSentence": "Patient medical records are strictly confidential and protected by rigorous privacy legislation.",
        "vietnameseTranslation": "Hồ sơ y tế của bệnh nhân là tuyệt mật và được bảo vệ bởi luật bảo mật nghiêm ngặt.",
        "level": "C1",
        "collocation": "Strictly confidential / Confidential records"
      },
      {
        "word": "Incredulous",
        "partOfSpeech": "adj",
        "meaning": "Không thể tin nổi, đầy hoài nghi",
        "visualBreakdown": "In- (không) + Cred (tin) + -ulous (nghi ngờ)",
        "ieltsSentence": "Economists remained incredulous at corporate claims of thirty percent quarterly profit expansion during a recession.",
        "vietnameseTranslation": "Các nhà kinh tế học vẫn đầy hoài nghi trước những tuyên bố của tập đoàn về mức tăng trưởng lợi nhuận 30% trong thời kỳ suy thoái.",
        "level": "C2",
        "collocation": "Incredulous look / Highly incredulous"
      },
      {
        "word": "Fidelity",
        "partOfSpeech": "n",
        "meaning": "Lòng trung thành; độ trung thực, chuẩn xác",
        "visualBreakdown": "Fid (tin) + -ity",
        "ieltsSentence": "High fidelity audio synthesis replicates acoustic subtleties with immaculate precision.",
        "vietnameseTranslation": "Sự tổng hợp âm thanh độ trung thực cao tái tạo những sắc thái âm học tinh tế với độ chính xác hoàn hảo.",
        "level": "C2",
        "collocation": "High fidelity / Unswerving fidelity"
      },
      {
        "word": "Diffident",
        "partOfSpeech": "adj",
        "meaning": "Thiếu tự tin, rụt rè, e dè",
        "visualBreakdown": "Dis- (thiếu) + Fid (tin) + -ent",
        "ieltsSentence": "Diffident graduate students often refrain from voicing provocative critiques during academic seminars.",
        "vietnameseTranslation": "Những sinh viên sau đại học thiếu tự tin thường ngần ngại bày tỏ những phê bình mang tính gợi mở trong các buổi hội thảo học thuật.",
        "level": "C2",
        "collocation": "Diffident demeanor / Diffident speaker"
      },
      {
        "word": "Credence",
        "partOfSpeech": "n",
        "meaning": "Sự tín nhiệm, lòng tin dành cho một luận điểm",
        "visualBreakdown": "Cred (tin) + -ence",
        "ieltsSentence": "Recent empirical archaeological excavations give credence to ancient oral migratory legends.",
        "vietnameseTranslation": "Các cuộc khai quật khảo cổ học thực nghiệm gần đây tạo sự tín nhiệm cho các truyền thuyết di cư truyền khẩu cổ xưa.",
        "level": "C2",
        "collocation": "Give credence to / Gain credence"
      },
      {
        "word": "Accreditation",
        "partOfSpeech": "n",
        "meaning": "Sự kiểm định chất lượng, cấp chứng nhận uy tín",
        "visualBreakdown": "Ad- (tới) + Cred (tin) + -ation",
        "ieltsSentence": "Tertiary institutions must undergo periodic accreditation to uphold pedagogical excellence.",
        "vietnameseTranslation": "Các cơ sở giáo dục đại học phải trải qua đợt kiểm định định kỳ để duy trì chất lượng giảng dạy xuất sắc.",
        "level": "C1",
        "collocation": "Institutional accreditation / Academic accreditation"
      },
      {
        "word": "Perfidy",
        "partOfSpeech": "n",
        "meaning": "Sự bội tín, phản bội lòng tin",
        "visualBreakdown": "Per- (xuyên qua, phá vỡ) + Fid (tin)",
        "ieltsSentence": "Unilaterally violating the international non-proliferation treaty was condemned as an act of diplomatic perfidy.",
        "vietnameseTranslation": "Việc đơn phương vi phạm hiệp ước không phổ biến vũ khí quốc tế đã bị lên án như một hành vi bội tín ngoại giao.",
        "level": "C2",
        "collocation": "Act of perfidy / Treacherous perfidy"
      }
    ]
  },
  {
    "id": "stem-val-vail",
    "root": "VAL / VAIL-",
    "meaning": "Giá trị, sức mạnh, hiệu lực, chiếm ưu thế",
    "origin": "Latin (valere - mạnh khỏe, có giá trị, có hiệu lực)",
    "description": "Gốc diễn đạt sức mạnh nội tại, tính hiệu lực pháp lý, giá trị định lượng hoặc sự áp đảo vượt trội.",
    "tip": "Nhớ đến Value (giá trị) hoặc Prevail (thắng thế) – sức mạnh khẳng định chỗ đứng.",
    "category": "Trục 6: Chân Lý, Đo Lường & Chuẩn Mực",
    "axis": "Trục 6",
    "axisTitle": "TRỤC 6: CHÂN LÝ, ĐO LƯỜNG & CHUẨN MỰC",
    "axisSubtitle": "Truth, Measure & Trust (Giá trị & Hiệu lực)",
    "stemKey": "VAL / VAIL-",
    "exampleWords": [
      {
        "word": "Evaluate",
        "partOfSpeech": "v",
        "meaning": "Đánh giá chất lượng, định giá hiệu năng",
        "visualBreakdown": "E- (lấy ra) + Val (giá trị) + -ate",
        "ieltsSentence": "Educational authorities must critically evaluate the long-term cognitive impact of standardized tests.",
        "vietnameseTranslation": "Các cơ quan giáo dục phải đánh giá thấu đáo tác động nhận thức lâu dài của các bài thi chuẩn hóa.",
        "level": "C1",
        "collocation": "Evaluate performance / Critically evaluate"
      },
      {
        "word": "Prevail",
        "partOfSpeech": "v",
        "meaning": "Chiếm ưu thế, thịnh hành, thắng thế",
        "visualBreakdown": "Pre- (trước) + Vail (mạnh) $\\rightarrow$ Sức mạnh vượt lên trên",
        "ieltsSentence": "Optimists maintain that democratic discourse will ultimately prevail over demagogic populism.",
        "vietnameseTranslation": "Những người lạc quan tin rằng diễn ngôn dân chủ cuối cùng sẽ thắng thế trước chủ nghĩa dân túy mị dân.",
        "level": "C1",
        "collocation": "Prevail over / Prevailing sentiment"
      },
      {
        "word": "Prevalent",
        "partOfSpeech": "adj",
        "meaning": "Phổ biến rộng khắp, thịnh hành",
        "visualBreakdown": "Pre- (trước) + Val (mạnh) + -ent",
        "ieltsSentence": "Sedentary leisure habits are increasingly prevalent among urban adolescents, precipitating health crises.",
        "vietnameseTranslation": "Thói quen giải trí thụ động, ít vận động đang ngày càng phổ biến trong giới thanh thiếu niên đô thị, làm dấy lên các cuộc khủng hoảng sức khỏe.",
        "level": "C1",
        "collocation": "Prevalent condition / Widely prevalent"
      },
      {
        "word": "Invalidate",
        "partOfSpeech": "v",
        "meaning": "Làm mất đi hiệu lực/giá trị pháp lý",
        "visualBreakdown": "In- (không) + Valid (hiệu lực) + -ate",
        "ieltsSentence": "Methodological procedural flaws in data collection can completely invalidate experimental outcomes.",
        "vietnameseTranslation": "Những sai sót về quy trình phương pháp luận trong việc thu thập dữ liệu có thể làm mất hoàn toàn giá trị của các kết quả thực nghiệm.",
        "level": "C1",
        "collocation": "Invalidate findings / Invalidate contract"
      },
      {
        "word": "Valiant",
        "partOfSpeech": "adj",
        "meaning": "Dũng cảm, kiên cường, quả cảm",
        "visualBreakdown": "Val (mạnh mẽ) + -iant",
        "ieltsSentence": "Despite valiant municipal reforestation initiatives, regional desertification continues to expand.",
        "vietnameseTranslation": "Bất chấp những sáng kiến trồng rừng quả cảm của chính quyền địa phương, tình trạng sa mạc hóa trong khu vực vẫn tiếp tục mở rộng.",
        "level": "C2",
        "collocation": "Valiant attempt / Valiant effort"
      },
      {
        "word": "Equivalent",
        "partOfSpeech": "adj",
        "meaning": "Tương đương về giá trị hoặc khối lượng",
        "visualBreakdown": "Equi- (bằng) + Val (giá trị) + -ent",
        "ieltsSentence": "Burning one ton of this refined biofuel releases energy equivalent to two barrels of conventional crude.",
        "vietnameseTranslation": "Đốt cháy một tấn nhiên liệu sinh học tinh chế này giải phóng năng lượng tương đương với hai thùng dầu thô thông thường.",
        "level": "C1",
        "collocation": "Roughly equivalent / Functional equivalent"
      },
      {
        "word": "Valence",
        "partOfSpeech": "n",
        "meaning": "Hóa trị; sức hút tâm lý, giá trị định hướng",
        "visualBreakdown": "Val (sức mạnh) + -ence",
        "ieltsSentence": "Political slogans carry immense emotional valence capable of polarizing electorates.",
        "vietnameseTranslation": "Các khẩu hiệu chính trị mang sức hút cảm xúc to lớn có khả năng phân cực cử tri.",
        "level": "C2",
        "collocation": "Emotional valence / High valence"
      },
      {
        "word": "Avail",
        "partOfSpeech": "v",
        "meaning": "Tận dụng lợi thế; có ích, mang lại giá trị",
        "visualBreakdown": "Ad- (tới) + Vail (sức mạnh)",
        "ieltsSentence": "Enterprises must avail themselves of cutting-edge automation to sustain international competitiveness.",
        "vietnameseTranslation": "Các doanh nghiệp phải tận dụng tối đa công nghệ tự động hóa tiên tiến để duy trì năng lực cạnh tranh quốc tế.",
        "level": "C2",
        "collocation": "Avail oneself of / To no avail"
      }
    ]
  },
  {
    "id": "stem-simil-par",
    "root": "EQU / SIMIL / PAR-",
    "meaning": "Đồng dạng, đồng hóa, tương xứng, ngang bằng",
    "origin": "Latin (similis - tương tự; par - ngang bằng)",
    "description": "Gốc chỉ sự tương đồng, đồng nhất hóa, sự tương xứng cân bằng hoặc sự chênh lệch so sánh trong xã hội học.",
    "tip": "Nhớ đến Similar (tương tự) hoặc Parallel (song song) – đặt cạnh nhau để so chiếu.",
    "category": "Trục 6: Chân Lý, Đo Lường & Chuẩn Mực",
    "axis": "Trục 6",
    "axisTitle": "TRỤC 6: CHÂN LÝ, ĐO LƯỜNG & CHUẨN MỰC",
    "axisSubtitle": "Truth, Measure & Trust (Tương đồng & Chuẩn mực)",
    "stemKey": "SIMIL / PAR-",
    "exampleWords": [
      {
        "word": "Assimilate",
        "partOfSpeech": "v",
        "meaning": "Đồng hóa; tiếp thu và hòa nhập tri thức mới",
        "visualBreakdown": "As- (vào) + Simil (giống) $\\rightarrow$ Hòa làm một",
        "ieltsSentence": "Immigrant communities often struggle to assimilate into host cultures while preserving heritage traditions.",
        "vietnameseTranslation": "Các cộng đồng người nhập cư thường chật vật để hòa nhập vào nền văn hóa bản địa trong khi vẫn bảo tồn các truyền thống di sản.",
        "level": "C1",
        "collocation": "Assimilate into culture / Assimilate information"
      },
      {
        "word": "Disparity",
        "partOfSpeech": "n",
        "meaning": "Sự chênh lệch, phân hóa rõ rệt",
        "visualBreakdown": "Dis- (không) + Par (ngang bằng) + -ity",
        "ieltsSentence": "The widening wealth disparity between metropolitan cores and neglected hinterlands threatens social stability.",
        "vietnameseTranslation": "Sự chênh lệch giàu nghèo ngày càng mở rộng giữa các lõi đô thị và vùng nội địa bị lãng quên đe dọa sự ổn định xã hội.",
        "level": "C1",
        "collocation": "Income disparity / Wide disparity"
      },
      {
        "word": "Parity",
        "partOfSpeech": "n",
        "meaning": "Sự bình đẳng, thế ngang bằng (về tiền tệ, quyền lợi)",
        "visualBreakdown": "Par (ngang bằng) + -ity",
        "ieltsSentence": "Advocates demand legislative action to guarantee gender pay parity across all corporate sectors.",
        "vietnameseTranslation": "Những người ủng hộ yêu cầu hành động lập pháp để đảm bảo sự bình đẳng tiền lương theo giới trên mọi lĩnh vực doanh nghiệp.",
        "level": "C1",
        "collocation": "Achieve parity / Purchasing power parity"
      },
      {
        "word": "Dissimilar",
        "partOfSpeech": "adj",
        "meaning": "Khác biệt, không giống nhau",
        "visualBreakdown": "Dis- (không) + Similar (giống)",
        "ieltsSentence": "Although originating from dissimilar backgrounds, both scholars arrived at concordant philosophical conclusions.",
        "vietnameseTranslation": "Mặc dù xuất thân từ những hoàn cảnh khác biệt, cả hai học giả đều đi đến những kết luận triết học tương đồng.",
        "level": "C1",
        "collocation": "Dissimilar outcomes / Strikingly dissimilar"
      },
      {
        "word": "Peerless",
        "partOfSpeech": "adj",
        "meaning": "Vô song, không ai sánh bằng",
        "visualBreakdown": "Peer (người ngang hàng) + -less (không có)",
        "ieltsSentence": "The classical composer earned peerless acclaim for harmonizing traditional motifs with modern orchestration.",
        "vietnameseTranslation": "Nhà soạn nhạc cổ điển đã nhận được sự tán dương vô song nhờ việc hài hòa các mô-típ truyền thống với dàn nhạc hiện đại.",
        "level": "C2",
        "collocation": "Peerless craftsmanship / Peerless talent"
      },
      {
        "word": "Simultaneous",
        "partOfSpeech": "adj",
        "meaning": "Đồng thời, xảy ra cùng một lúc",
        "visualBreakdown": "Simul (cùng một lúc) + -aneous",
        "ieltsSentence": "The simultaneous collapse of major lending banks triggered global market contagion.",
        "vietnameseTranslation": "Sự sụp đổ đồng thời của các ngân hàng cho vay lớn đã kích hoạt hiệu ứng lây lan trên thị trường toàn cầu.",
        "level": "C1",
        "collocation": "Simultaneous translation / Simultaneous occurrence"
      },
      {
        "word": "Incomparable",
        "partOfSpeech": "adj",
        "meaning": "Không thể so sánh được, tuyệt đỉnh",
        "visualBreakdown": "In- (không) + Compare (so sánh) + -able",
        "ieltsSentence": "The pristine biodiversity of the Galapagos archipelago offers incomparable ecological insights.",
        "vietnameseTranslation": "Sự đa dạng sinh học nguyên sơ của quần đảo Galapagos cung cấp những hiểu biết sinh thái học không gì sánh được.",
        "level": "C2",
        "collocation": "Incomparable beauty / Incomparable advantage"
      },
      {
        "word": "Simulate",
        "partOfSpeech": "v",
        "meaning": "Mô phỏng, giả lập môi trường",
        "visualBreakdown": "Simil (giống) + -ate",
        "ieltsSentence": "High-powered supercomputers simulate climate scenarios to forecast sea level rises over the forthcoming century.",
        "vietnameseTranslation": "Các siêu máy tính công suất lớn mô phỏng các kịch bản khí hậu để dự báo mực nước biển dâng trong thế kỷ tới.",
        "level": "C1",
        "collocation": "Simulate conditions / Computer simulation"
      }
    ]
  },
  {
    "id": "stem-pon-pos",
    "root": "PON / POS / POSIT-",
    "meaning": "Đặt, để, sắp đặt vị trí, bố trí",
    "origin": "Latin (ponere, positus - đặt, để)",
    "description": "Gốc chỉ hành động đặt để thực thể, trình bày ý tưởng, định vị chiến lược hoặc sắp đặt tương quan.",
    "tip": "Nhớ đến Position (vị trí) hoặc Propose (đề xuất) – đặt quân cờ vào đúng vị thế.",
    "category": "Trục 7: Vị Thế, Thuộc Tính & Bền Vững",
    "axis": "Trục 7",
    "axisTitle": "TRỤC 7: VỊ THẾ, THUỘC TÍNH & BỀN VỮNG",
    "axisSubtitle": "State, Position & Holding (Đặt để & Định vị)",
    "stemKey": "PON / POS-",
    "exampleWords": [
      {
        "word": "Propose",
        "partOfSpeech": "v",
        "meaning": "Đề xuất, kiến nghị giải pháp",
        "visualBreakdown": "Pro- (phía trước) + Pose (đặt) $\\rightarrow$ Đặt ý kiến ra trước bàn nghị sự",
        "ieltsSentence": "Urban planners propose constructing decentralized rapid transit lines to alleviate suburban traffic bottlenecks.",
        "vietnameseTranslation": "Các nhà quy hoạch đô thị đề xuất xây dựng các tuyến tàu điện ngầm phân tán để giảm bớt các nút thắt cổ chai giao thông ngoại ô.",
        "level": "C1",
        "collocation": "Propose a reform / Propose an initiative"
      },
      {
        "word": "Juxtapose",
        "partOfSpeech": "v",
        "meaning": "Đặt cạnh nhau để so sánh đối chiếu tương phản",
        "visualBreakdown": "Juxta (gần kề) + Pose (đặt)",
        "ieltsSentence": "The photojournalist chose to juxtapose gleaming skyscrapers with dilapidated shantytowns to highlight inequality.",
        "vietnameseTranslation": "Nhà báo ảnh đã chọn đặt cạnh nhau những tòa nhà chọc trời lộng lẫy với các khu ổ chuột tồi tàn để làm nổi bật sự bất bình đẳng.",
        "level": "C2",
        "collocation": "Juxtapose contrasting views / Strikingly juxtaposed"
      },
      {
        "word": "Disposition",
        "partOfSpeech": "n",
        "meaning": "Khuynh hướng tính khí bẩm sinh; sự sắp đặt",
        "visualBreakdown": "Dis- (từng phần) + Posit (đặt) + -ion",
        "ieltsSentence": "A genetic predisposition to hypertension can be mitigated by conscientious lifestyle interventions.",
        "vietnameseTranslation": "Khuynh hướng bẩm sinh do di truyền dẫn đến huyết áp cao có thể được giảm thiểu bằng các can thiệp lối sống chu đáo.",
        "level": "C2",
        "collocation": "Gentle disposition / Genetic predisposition"
      },
      {
        "word": "Deposition",
        "partOfSpeech": "n",
        "meaning": "Sự lắng đọng trầm tích; lời khai hữu thệ",
        "visualBreakdown": "De- (xuống) + Posit (đặt) + -ion",
        "ieltsSentence": "Centuries of sediment deposition created nutrient-rich alluvial plains ideal for intensive agriculture.",
        "vietnameseTranslation": "Nhiều thế kỷ lắng đọng trầm tích đã tạo nên những vùng đồng bằng phù sa màu mỡ lý tưởng cho canh tác nông nghiệp thâm canh.",
        "level": "C1",
        "collocation": "Sediment deposition / Legal deposition"
      },
      {
        "word": "Posit",
        "partOfSpeech": "v",
        "meaning": "Đặt giả định làm cơ sở lý luận",
        "visualBreakdown": "Posit (đặt nền tảng)",
        "ieltsSentence": "Evolutionary psychologists posit that altruism originated as a survival mechanism in ancestral clans.",
        "vietnameseTranslation": "Các nhà tâm lý học tiến hóa đưa ra giả định rằng lòng vị tha bắt nguồn như một cơ chế sinh tồn trong các thị tộc tổ tiên.",
        "level": "C2",
        "collocation": "Posit a hypothesis / Posit that"
      },
      {
        "word": "Superimpose",
        "partOfSpeech": "v",
        "meaning": "Đặt chồng lấn lên trên một lớp khác",
        "visualBreakdown": "Super- (trên) + Im- (vào) + Pose (đặt)",
        "ieltsSentence": "Augmented reality applications superimpose computer-generated diagrams onto real-world surgical views.",
        "vietnameseTranslation": "Các ứng dụng thực tế tăng cường đặt chồng các sơ đồ do máy tính tạo lên trên tầm nhìn phẫu thuật trong thế giới thực.",
        "level": "C2",
        "collocation": "Superimpose an image / Superimpose layers"
      },
      {
        "word": "Postulate",
        "partOfSpeech": "v",
        "meaning": "Đòi hỏi tiên đề, mặc định làm tiền đề",
        "visualBreakdown": "Postulate (đặt ra nguyên lý cơ bản)",
        "ieltsSentence": "Classical economists postulate that market participants act with rational self-interest.",
        "vietnameseTranslation": "Các nhà kinh tế học cổ điển mặc định tiền đề rằng các thành viên tham gia thị trường luôn hành động vì tư lợi hợp lý.",
        "level": "C2",
        "collocation": "Postulate a theory / Fundamental postulate"
      },
      {
        "word": "Composite",
        "partOfSpeech": "adj",
        "meaning": "Hỗn hợp, kết hợp nhiều thành phần cấu tạo",
        "visualBreakdown": "Com- (cùng) + Posit (đặt) + -e",
        "ieltsSentence": "Aeronautical engineers utilize composite carbon-fiber polymers to lighten fuselage weight while preserving structural rigidity.",
        "vietnameseTranslation": "Các kỹ sư hàng không vũ trụ sử dụng polyme sợi carbon composite để giảm trọng lượng thân máy bay trong khi vẫn giữ được độ cứng cấu trúc.",
        "level": "C1",
        "collocation": "Composite material / Composite index"
      }
    ]
  },
  {
    "id": "stem-ten-tain",
    "root": "TEN / TAIN / TIN-",
    "meaning": "Cầm, nắm giữ, duy trì, chịu đựng, bảo tồn",
    "origin": "Latin (tenere - giữ chặt, duy trì)",
    "description": "Gốc nói về việc duy trì trạng thái bền bỉ theo thời gian, kiên trì không từ bỏ và giữ gìn tài nguyên.",
    "tip": "Nhớ đến Maintain (duy trì) hoặc Sustain (bền vững) – giữ chắc trong lòng bàn tay.",
    "category": "Trục 7: Vị Thế, Thuộc Tính & Bền Vững",
    "axis": "Trục 7",
    "axisTitle": "TRỤC 7: VỊ THẾ, THUỘC TÍNH & BỀN VỮNG",
    "axisSubtitle": "State, Position & Holding (Nắm giữ & Bền bỉ)",
    "stemKey": "TEN / TAIN-",
    "exampleWords": [
      {
        "word": "Sustainable",
        "partOfSpeech": "adj",
        "meaning": "Bền vững, có thể duy trì lâu dài",
        "visualBreakdown": "Sus- (dưới) + Tain (giữ) + -able $\\rightarrow$ Đỡ được từ bên dưới lâu dài",
        "ieltsSentence": "Governments must enact coherent policies to transition away from fossil dependence toward sustainable renewable energy.",
        "vietnameseTranslation": "Các chính phủ phải ban hành các chính sách nhất quán để chuyển đổi khỏi sự phụ thuộc vào hóa thạch hướng tới năng lượng tái tạo bền vững.",
        "level": "C1",
        "collocation": "Sustainable development / Sustainable practice"
      },
      {
        "word": "Retain",
        "partOfSpeech": "v",
        "meaning": "Giữ lại, giữ chân nhân tài, lưu giữ ký ức",
        "visualBreakdown": "Re- (lại) + Tain (giữ)",
        "ieltsSentence": "Regional healthcare networks often struggle to retain qualified specialists due to uncompetitive salary packages.",
        "vietnameseTranslation": "Mạng lưới y tế khu vực thường chật vật để giữ chân các bác sĩ chuyên khoa giỏi do chế độ đãi ngộ tiền lương không cạnh tranh.",
        "level": "C1",
        "collocation": "Retain talent / Retain information"
      },
      {
        "word": "Attain",
        "partOfSpeech": "v",
        "meaning": "Đạt được mục tiêu, vươn tới thành tựu",
        "visualBreakdown": "Ad- (tới) + Tain (chạm tới và giữ)",
        "ieltsSentence": "Underprivileged pupils require targeted pedagogical support to attain high academic parity with their affluent peers.",
        "vietnameseTranslation": "Học sinh có hoàn cảnh khó khăn cần được hỗ trợ sư phạm chuyên biệt để đạt được sự ngang bằng học thuật cao với các bạn đồng trang lứa khá giả.",
        "level": "C1",
        "collocation": "Attain objectives / Attain proficiency"
      },
      {
        "word": "Tenacious",
        "partOfSpeech": "adj",
        "meaning": "Kiên trì, bền bỉ đến cùng, bám chặt",
        "visualBreakdown": "Ten (giữ) + -acious",
        "ieltsSentence": "Through tenacious investigative journalism, the reporter unmasked systemic corruption within municipal procurement.",
        "vietnameseTranslation": "Thông qua báo chí điều tra kiên trì và bền bỉ, phóng viên đã lột trần nạn tham nhũng có hệ thống trong hoạt động mua sắm công của thành phố.",
        "level": "C2",
        "collocation": "Tenacious effort / Tenacious resistance"
      },
      {
        "word": "Pertinent",
        "partOfSpeech": "adj",
        "meaning": "Xác đáng, thích đáng, gắn liền với vấn đề",
        "visualBreakdown": "Per- (thông suốt) + Tin (giữ) + -ent",
        "ieltsSentence": "Academic researchers must formulate pertinent questions rather than amassing superfluous extraneous data.",
        "vietnameseTranslation": "Các nhà nghiên cứu học thuật phải đặt ra những câu hỏi xác đáng thay vì thu thập dữ liệu râu ria thừa thãi.",
        "level": "C1",
        "collocation": "Pertinent question / Highly pertinent"
      },
      {
        "word": "Abstain",
        "partOfSpeech": "v",
        "meaning": "Kiêng cữ, bỏ phiếu trắng",
        "visualBreakdown": "Abs- (rời xa) + Tain (giữ mình)",
        "ieltsSentence": "Several non-aligned delegations elected to abstain during the contentious United Nations resolution vote.",
        "vietnameseTranslation": "Một số phái đoàn không liên kết đã chọn bỏ phiếu trắng trong cuộc bỏ phiếu nghị quyết gây tranh cãi của Liên Hợp Quốc.",
        "level": "C1",
        "collocation": "Abstain from voting / Abstain from alcohol"
      },
      {
        "word": "Tenable",
        "partOfSpeech": "adj",
        "meaning": "Có thể đứng vững được, bảo vệ được (luận điểm)",
        "visualBreakdown": "Ten (giữ) + -able",
        "ieltsSentence": "In light of newly surfaced forensic evidence, the defense hypothesis is no longer logically tenable.",
        "vietnameseTranslation": "Trước các bằng chứng pháp y mới xuất hiện, giả thuyết của bên bào chữa không còn có thể đứng vững về mặt logic nữa.",
        "level": "C2",
        "collocation": "Tenable position / Logically tenable"
      },
      {
        "word": "Untenable",
        "partOfSpeech": "adj",
        "meaning": "Không thể bào chữa hay bảo vệ được",
        "visualBreakdown": "Un- (không) + Ten (giữ) + -able",
        "ieltsSentence": "Soaring inflation made the administration's fiscal austerity stance politically untenable.",
        "vietnameseTranslation": "Lạm phát tăng vọt đã khiến quan điểm thắt lưng buộc bụng tài khóa của chính quyền không còn có thể duy trì về mặt chính trị.",
        "level": "C2",
        "collocation": "Untenable situation / Untenable argument"
      }
    ]
  },
  {
    "id": "stem-sta-stat",
    "root": "STA / STAT / STIT-",
    "meaning": "Đứng yên, trạng thái, thiết lập, cố định",
    "origin": "Latin (stare - đứng; statuere - dựng nên)",
    "description": "Gốc chỉ sự đứng vững, các thiết chế xã hội được thành lập, tính trì trệ hoặc trạng thái cố định ổn định.",
    "tip": "Nhớ đến Status (trạng thái) hoặc Station (nhà ga cố định) – đứng yên kiên định tại chỗ.",
    "category": "Trục 7: Vị Thế, Thuộc Tính & Bền Vững",
    "axis": "Trục 7",
    "axisTitle": "TRỤC 7: VỊ THẾ, THUỘC TÍNH & BỀN VỮNG",
    "axisSubtitle": "State, Position & Holding (Đứng vững & Thiết chế)",
    "stemKey": "STA / STAT-",
    "exampleWords": [
      {
        "word": "Stagnant",
        "partOfSpeech": "adj",
        "meaning": "Trì trệ, đọng nước, không phát triển",
        "visualBreakdown": "Stag- (đứng yên) + -ant",
        "ieltsSentence": "Without technological modernization, domestic industrial wages have remained stagnant for over a decade.",
        "vietnameseTranslation": "Nếu không có hiện đại hóa công nghệ, tiền lương công nghiệp trong nước vẫn giữ nguyên tình trạng trì trệ trong hơn một thập kỷ.",
        "level": "C1",
        "collocation": "Stagnant economy / Stagnant water"
      },
      {
        "word": "Reinstate",
        "partOfSpeech": "v",
        "meaning": "Phục hồi chức vụ, tái lập chính sách cũ",
        "visualBreakdown": "Re- (lại) + In- (vào) + State (đứng)",
        "ieltsSentence": "Following civil demonstrations, the municipality agreed to reinstate subsidies for low-income commuters.",
        "vietnameseTranslation": "Sau các cuộc biểu tình dân sự, chính quyền thành phố đã đồng ý tái lập trợ cấp cho những người đi làm có thu nhập thấp.",
        "level": "C1",
        "collocation": "Reinstate a policy / Reinstate an official"
      },
      {
        "word": "Constitute",
        "partOfSpeech": "v",
        "meaning": "Cấu thành nên, thiết lập nên tỷ trọng",
        "visualBreakdown": "Con- (cùng) + Stit (dựng nên) + -e",
        "ieltsSentence": "Small and medium enterprises constitute the bedrock of national entrepreneurial vitality.",
        "vietnameseTranslation": "Các doanh nghiệp vừa và nhỏ cấu thành nên nền tảng của sức sống khởi nghiệp quốc gia.",
        "level": "C1",
        "collocation": "Constitute a threat / Constitute a majority"
      },
      {
        "word": "Status quo",
        "partOfSpeech": "n",
        "meaning": "Hiện trạng hiện tại, tình trạng nguyên trạng",
        "visualBreakdown": "Latin (trạng thái như nó vốn là)",
        "ieltsSentence": "Entrenched corporate interests consistently lobby to protect the status quo against renewable reforms.",
        "vietnameseTranslation": "Các nhóm lợi ích doanh nghiệp bám rễ sâu luôn vận động hành lang để bảo vệ hiện trạng chống lại các cải cách tái tạo.",
        "level": "C2",
        "collocation": "Maintain the status quo / Challenge the status quo"
      },
      {
        "word": "Static",
        "partOfSpeech": "adj",
        "meaning": "Tĩnh, không chuyển động, không đổi",
        "visualBreakdown": "Stat (đứng) + -ic",
        "ieltsSentence": "Language is dynamic rather than static, continually assimilating neologisms from digital spheres.",
        "vietnameseTranslation": "Ngôn ngữ mang tính vận động chứ không tĩnh tại, liên tục tiếp thu các từ mới từ các không gian kỹ thuật số.",
        "level": "C1",
        "collocation": "Static variable / Static population"
      },
      {
        "word": "Obstinate",
        "partOfSpeech": "adj",
        "meaning": "Ngoan cố, bướng bỉnh, khó chữa",
        "visualBreakdown": "Ob- (chống lại) + Stat (đứng)",
        "ieltsSentence": "Obstinate refusal to devalue inflated currency exacerbated the balance of payments deficit.",
        "vietnameseTranslation": "Sự từ chối ngoan cố không chịu phá giá đồng tiền bị thổi phồng đã làm trầm trọng thêm mức thâm hụt cán cân thanh toán.",
        "level": "C2",
        "collocation": "Obstinate resistance / Obstinate refusal"
      },
      {
        "word": "Destitute",
        "partOfSpeech": "adj",
        "meaning": "Cơ hàn, bần cùng hóa, thiếu thốn hoàn toàn",
        "visualBreakdown": "De- (mất đi) + Stit (đứng vững)",
        "ieltsSentence": "Severe natural disasters frequently leave rural agrarian households entirely destitute of shelter and livelihood.",
        "vietnameseTranslation": "Thiên tai nghiêm trọng thường khiến các hộ gia đình nông nghiệp nông thôn hoàn toàn cơ hàn, mất chỗ che thân và sinh kế.",
        "level": "C2",
        "collocation": "Destitute of resources / Left destitute"
      },
      {
        "word": "Restitution",
        "partOfSpeech": "n",
        "meaning": "Sự hoàn trả, bồi thường thiệt hại",
        "visualBreakdown": "Re- (lại) + Stit (dựng lại) + -ion",
        "ieltsSentence": "The multinational corporation was legally ordered to pay financial restitution to communities impacted by toxic dumping.",
        "vietnameseTranslation": "Tập đoàn đa quốc gia đã bị tòa án yêu cầu bồi thường tài chính cho các cộng đồng bị ảnh hưởng bởi việc xả thải độc hại.",
        "level": "C2",
        "collocation": "Make restitution / Seek financial restitution"
      }
    ]
  },
  {
    "id": "stem-sed-sid",
    "root": "SED / SID / SESS-",
    "meaning": "Ngồi yên, lắng xuống, cư trú, định hình",
    "origin": "Latin (sedere, sessus - ngồi)",
    "description": "Gốc chỉ tư thế ngồi thụ động, sự định cư ổn định, quá trình lắng đọng vật lý hoặc đánh giá xem xét một vấn đề.",
    "tip": "Nhớ đến Sedentary (ít vận động) hoặc President (người ngồi ghế chủ tịch) – an vị tại chỗ.",
    "category": "Trục 7: Vị Thế, Thuộc Tính & Bền Vững",
    "axis": "Trục 7",
    "axisTitle": "TRỤC 7: VỊ THẾ, THUỘC TÍNH & BỀN VỮNG",
    "axisSubtitle": "State, Position & Holding (Ngồi yên & Cư trú)",
    "stemKey": "SED / SID-",
    "exampleWords": [
      {
        "word": "Sedentary",
        "partOfSpeech": "adj",
        "meaning": "Thói quen ít vận động, ngồi nhiều một chỗ",
        "visualBreakdown": "Seden (ngồi) + -ary",
        "ieltsSentence": "Prolonged sedentary lifestyles among office workers directly exacerbate cardiovascular risks.",
        "vietnameseTranslation": "Lối sống ngồi nhiều ít vận động kéo dài trong giới nhân viên văn phòng trực tiếp làm trầm trọng thêm các nguy cơ tim mạch.",
        "level": "C1",
        "collocation": "Sedentary lifestyle / Sedentary job"
      },
      {
        "word": "Subside",
        "partOfSpeech": "v",
        "meaning": "Lắng dịu xuống, sụt lún địa chất",
        "visualBreakdown": "Sub- (dưới) + Side (ngồi xuống)",
        "ieltsSentence": "Excessive groundwater extraction causes coastal terrain to subside at alarming rates.",
        "vietnameseTranslation": "Việc khai thác nước ngầm quá mức khiến địa hình ven biển sụt lún với tốc độ đáng báo động.",
        "level": "C1",
        "collocation": "Floodwaters subside / Ground subsides"
      },
      {
        "word": "Reside",
        "partOfSpeech": "v",
        "meaning": "Cư trú, trú ngụ lâu dài",
        "visualBreakdown": "Re- (lại) + Side (ngồi cố định)",
        "ieltsSentence": "A substantial proportion of migrant workers reside in informal housing lacking basic plumbing.",
        "vietnameseTranslation": "Một tỷ lệ đáng kể người lao động di cư cư trú trong những khu nhà tạm bợ thiếu hệ thống ống nước cơ bản.",
        "level": "C1",
        "collocation": "Reside permanently / Residential area"
      },
      {
        "word": "Preside",
        "partOfSpeech": "v",
        "meaning": "Chủ trì, ngồi ghế điều hành (phiên họp, tòa án)",
        "visualBreakdown": "Pre- (trước) + Side (ngồi)",
        "ieltsSentence": "A senior high court judge was appointed to preside over the antitrust hearing.",
        "vietnameseTranslation": "Một thẩm phán tòa án tối cao cấp cao đã được bổ nhiệm để chủ trì phiên điều trần chống độc quyền.",
        "level": "C2",
        "collocation": "Preside over a meeting / Preside over trial"
      },
      {
        "word": "Sedimentary",
        "partOfSpeech": "adj",
        "meaning": "Thuộc về trầm tích đất đá lắng đọng",
        "visualBreakdown": "Sediment (cặn lắng) + -ary",
        "ieltsSentence": "Geologists examine sedimentary rock strata to reconstruct prehistoric oceanic climatic cycles.",
        "vietnameseTranslation": "Các nhà địa chất học kiểm tra các địa tầng đá trầm tích để tái hiện các chu kỳ khí hậu đại dương tiền sử.",
        "level": "C1",
        "collocation": "Sedimentary rock / Sedimentary layer"
      },
      {
        "word": "Dissident",
        "partOfSpeech": "n",
        "meaning": "Người bất đồng chính kiến, người ngồi riêng một lối",
        "visualBreakdown": "Dis- (tách rời) + Sid (ngồi) + -ent",
        "ieltsSentence": "Political dissidents were subjected to surveillance and censorship by the governing junta.",
        "vietnameseTranslation": "Những người bất đồng chính kiến đã bị quân phiệt cầm quyền đặt dưới sự giám sát và kiểm duyệt gắt gao.",
        "level": "C2",
        "collocation": "Political dissident / Dissident voice"
      },
      {
        "word": "Subsidy",
        "partOfSpeech": "n",
        "meaning": "Tiền trợ cấp, hỗ trợ kinh tế để giữ giá",
        "visualBreakdown": "Sub- (bên dưới) + Sid (ngồi chống đỡ)",
        "ieltsSentence": "Phasing out government fossil fuel subsidies is vital to incentivize private investment in solar technology.",
        "vietnameseTranslation": "Việc từng bước loại bỏ các khoản trợ cấp nhiên liệu hóa thạch của chính phủ là thiết yếu để khuyến khích đầu tư tư nhân vào công nghệ mặt trời.",
        "level": "C1",
        "collocation": "Government subsidy / Eliminate subsidies"
      },
      {
        "word": "Assess",
        "partOfSpeech": "v",
        "meaning": "Đánh giá, ước lượng giá trị/nguy cơ",
        "visualBreakdown": "Ad- (bên cạnh) + Sess (ngồi cùng để phán định)",
        "ieltsSentence": "Actuaries assess potential underwriting risks before determining life insurance policy premiums.",
        "vietnameseTranslation": "Các chuyên gia tính toán thẩm định đánh giá các rủi ro bảo hiểm tiềm ẩn trước khi xác định mức phí hợp đồng bảo hiểm nhân thọ.",
        "level": "C1",
        "collocation": "Assess the damage / Assess risk"
      }
    ]
  },
  {
    "id": "stem-gress-grad",
    "root": "GRESS / GRAD-",
    "meaning": "Bước đi, tiến triển, nấc thang, mức độ",
    "origin": "Latin (gradi, gressus - bước đi)",
    "description": "Gốc diễn tả từng bước tiến lên, quá trình thoái trào thụt lùi, hoặc sự chia thang bậc mức độ.",
    "tip": "Nhớ đến Progress (tiến bộ) hoặc Graduate (tốt nghiệp từng bước) – những bước chân trên con đường.",
    "category": "Trục 8: Vận Động Của Dòng Đời & Chuyển Dịch",
    "axis": "Trục 8",
    "axisTitle": "TRỤC 8: VẬN ĐỘNG CỦA DÒNG ĐỜI & CHUYỂN DỊCH",
    "axisSubtitle": "Cycle, Progress & Limits (Bước đi & Tiến trình)",
    "stemKey": "GRESS / GRAD-",
    "exampleWords": [
      {
        "word": "Progressive",
        "partOfSpeech": "adj",
        "meaning": "Cấp tiến, tiến bộ, ngày càng gia tăng",
        "visualBreakdown": "Pro- (phía trước) + Gress (bước) + -ive",
        "ieltsSentence": "Scandinavian nations have successfully enacted progressive taxation to curb social inequality.",
        "vietnameseTranslation": "Các quốc gia Scandinavia đã ban hành thành công chính sách thuế lũy tiến để hạn chế bất bình đẳng xã hội.",
        "level": "C1",
        "collocation": "Progressive policy / Progressive tax"
      },
      {
        "word": "Retrograde",
        "partOfSpeech": "adj",
        "meaning": "Thụt lùi, thoái trào, đi ngược lại tiến bộ",
        "visualBreakdown": "Retro- (lùi lại) + Grade (bước)",
        "ieltsSentence": "Reintroducing tariffs on green technology components would represent a retrograde policy step.",
        "vietnameseTranslation": "Việc tái áp thuế lên các linh kiện công nghệ xanh sẽ đại diện cho một bước đi chính sách thụt lùi.",
        "level": "C2",
        "collocation": "Retrograde step / Retrograde motion"
      },
      {
        "word": "Transgression",
        "partOfSpeech": "n",
        "meaning": "Sự vi phạm pháp luật, vượt quá lằn ranh đạo đức",
        "visualBreakdown": "Trans- (vượt qua) + Gress (bước) + -ion $\\rightarrow$ Bước qua ranh giới cấm",
        "ieltsSentence": "Severe financial transgressions by executives warrant punitive custodial sentences.",
        "vietnameseTranslation": "Những vi phạm tài chính nghiêm trọng của các giám đốc điều hành đáng bị nhận các bản án tù trừng phạt.",
        "level": "C2",
        "collocation": "Moral transgression / Legal transgression"
      },
      {
        "word": "Digress",
        "partOfSpeech": "v",
        "meaning": "Lạc đề, đi chệch khỏi chủ đề chính",
        "visualBreakdown": "Dis- (xa ra) + Gress (bước)",
        "ieltsSentence": "In academic writing, candidates must avoid digressing into tangential personal anecdotes.",
        "vietnameseTranslation": "Trong văn phong học thuật, các thí sinh phải tránh việc lạc đề sang các giai thoại cá nhân ngoài lề.",
        "level": "C1",
        "collocation": "Digress from subject / Digress briefly"
      },
      {
        "word": "Regress",
        "partOfSpeech": "v",
        "meaning": "Thoái lui, thụt lùi về trạng thái kém hơn",
        "visualBreakdown": "Re- (ngược lại) + Gress (bước)",
        "ieltsSentence": "Without ongoing linguistic practice, adult learners tend to regress to elementary grammatical habits.",
        "vietnameseTranslation": "Nếu không có sự thực hành ngôn ngữ liên tục, người học trưởng thành có xu hướng thoái lui về các thói quen ngữ pháp sơ cấp.",
        "level": "C1",
        "collocation": "Regress into / Regression analysis"
      },
      {
        "word": "Gradient",
        "partOfSpeech": "n",
        "meaning": "Độ dốc, độ dốc nhiệt độ/nồng độ",
        "visualBreakdown": "Grad (bước dốc) + -ient",
        "ieltsSentence": "Cellular membranes maintain a steep electrochemical gradient to facilitate molecular transport.",
        "vietnameseTranslation": "Màng tế bào duy trì một độ dốc điện hóa dốc để tạo điều kiện thuận lợi cho việc vận chuyển phân tử.",
        "level": "C2",
        "collocation": "Steep gradient / Temperature gradient"
      },
      {
        "word": "Degradation",
        "partOfSpeech": "n",
        "meaning": "Sự suy thoái (môi trường, đạo đức), xói mòn",
        "visualBreakdown": "De- (xuống) + Grad (bước) + -ation",
        "ieltsSentence": "Intensive cattle ranching accelerates soil degradation throughout tropical rainforest biomes.",
        "vietnameseTranslation": "Chăn nuôi gia súc thâm canh đẩy nhanh sự suy thoái đất trên khắp các quần xã sinh vật rừng nhiệt đới.",
        "level": "C1",
        "collocation": "Environmental degradation / Land degradation"
      },
      {
        "word": "Egress",
        "partOfSpeech": "n",
        "meaning": "Lối thoát ra, sự đi ra ngoài",
        "visualBreakdown": "E- (ra ngoài) + Gress (bước)",
        "ieltsSentence": "Building safety codes mandate unhindered means of egress in public auditoriums during emergencies.",
        "vietnameseTranslation": "Các quy chuẩn an toàn xây dựng bắt buộc các lối thoát hiểm không bị cản trở tại các hội trường công cộng trong trường hợp khẩn cấp.",
        "level": "C2",
        "collocation": "Means of egress / Safe egress"
      }
    ]
  },
  {
    "id": "stem-fin-term",
    "root": "FIN / TERM-",
    "meaning": "Giới hạn, ranh giới, tận cùng, kết thúc",
    "origin": "Latin (finis - điểm cuối, ranh giới; terminus - cột mốc ranh giới)",
    "description": "Gốc nói về sự hữu hạn của tài nguyên thiên nhiên, các điều khoản thỏa thuận hoặc sự kết thúc chu kỳ.",
    "tip": "Nhớ đến Final (cuối cùng) hoặc Terminate (chấm dứt) – đã tới cột mốc ranh giới.",
    "category": "Trục 8: Vận Động Của Dòng Đời & Chuyển Dịch",
    "axis": "Trục 8",
    "axisTitle": "TRỤC 8: VẬN ĐỘNG CỦA DÒNG ĐỜI & CHUYỂN DỊCH",
    "axisSubtitle": "Cycle, Progress & Limits (Giới hạn & Kết thúc)",
    "stemKey": "FIN / TERM-",
    "exampleWords": [
      {
        "word": "Finite",
        "partOfSpeech": "adj",
        "meaning": "Hữu hạn, có giới hạn xác định",
        "visualBreakdown": "Fin (ranh giới) + -ite",
        "ieltsSentence": "Human civilization must confront the ecological reality of finite planetary reserves.",
        "vietnameseTranslation": "Nền văn minh nhân loại phải đối diện với thực tế sinh thái về các nguồn tài nguyên hữu hạn trên hành tinh.",
        "level": "C1",
        "collocation": "Finite resources / Finite capacity"
      },
      {
        "word": "Determine",
        "partOfSpeech": "v",
        "meaning": "Xác định rõ ràng, quyết định kết quả",
        "visualBreakdown": "De- (hoàn toàn) + Term (ranh giới) $\\rightarrow$ Đặt ra giới hạn giải pháp",
        "ieltsSentence": "Genetic factors and social environment jointly determine child cognitive development.",
        "vietnameseTranslation": "Các yếu tố di truyền và môi trường xã hội cùng nhau xác định sự phát triển nhận thức của trẻ.",
        "level": "C1",
        "collocation": "Determine the outcome / Determine accurately"
      },
      {
        "word": "Terminate",
        "partOfSpeech": "v",
        "meaning": "Chấm dứt hoàn toàn (hợp đồng, vòng đời)",
        "visualBreakdown": "Term (điểm cuối) + -ate",
        "ieltsSentence": "The university reserved the right to terminate student accommodation contracts upon code violations.",
        "vietnameseTranslation": "Trường đại học có quyền chấm dứt hợp đồng ký túc xá của sinh viên khi có vi phạm nội quy.",
        "level": "C1",
        "collocation": "Terminate a contract / Terminate employment"
      },
      {
        "word": "Infinite",
        "partOfSpeech": "adj",
        "meaning": "Vô hạn, vô tận, không thể đong đếm",
        "visualBreakdown": "In- (không) + Finite (hữu hạn)",
        "ieltsSentence": "The cosmos encompasses an seemingly infinite expanse of galaxies exceeding human comprehension.",
        "vietnameseTranslation": "Vũ trụ bao gồm một khoảng không gian các thiên hà dường như vô tận vượt xa tầm hiểu biết của con người.",
        "level": "C1",
        "collocation": "Infinite variety / Infinite possibilities"
      },
      {
        "word": "Definitive",
        "partOfSpeech": "adj",
        "meaning": "Dứt khoát, mang tính kết luận chung cuộc",
        "visualBreakdown": "De- (hoàn toàn) + Fin (ranh giới) + -itive",
        "ieltsSentence": "Clinical researchers have yet to formulate a definitive cure for auto-immune neurological syndromes.",
        "vietnameseTranslation": "Các nhà nghiên cứu lâm sàng vẫn chưa đưa ra được một phương pháp chữa trị dứt khoát cho các hội chứng thần kinh tự miễn.",
        "level": "C2",
        "collocation": "Definitive answer / Definitive guide"
      },
      {
        "word": "Terminal",
        "partOfSpeech": "adj",
        "meaning": "Giai đoạn cuối (bệnh tật); điểm ga cuối",
        "visualBreakdown": "Term (ranh giới) + -al",
        "ieltsSentence": "Palliative hospice care centers specialize in providing compassionate dignity to patients facing terminal illness.",
        "vietnameseTranslation": "Các trung tâm chăm sóc xoa dịu chuyên cung cấp phẩm giá nhân ái cho các bệnh nhân đối mặt với bệnh hiểm nghèo giai đoạn cuối.",
        "level": "C1",
        "collocation": "Terminal cancer / Terminal decline"
      },
      {
        "word": "Exterminate",
        "partOfSpeech": "v",
        "meaning": "Tiêu diệt hoàn toàn, tận diệt",
        "visualBreakdown": "Ex- (hoàn toàn) + Term (ranh giới) + -ate",
        "ieltsSentence": "Excessive usage of broad-spectrum insecticides threatens to exterminate beneficial pollinator bees.",
        "vietnameseTranslation": "Việc sử dụng quá mức các loại thuốc trừ sâu phổ rộng đe dọa tiêu diệt hoàn toàn các loài ong thụ phấn có ích.",
        "level": "C2",
        "collocation": "Exterminate pests / Exterminate populations"
      },
      {
        "word": "Indeterminate",
        "partOfSpeech": "adj",
        "meaning": "Không xác định rõ, mập mờ mơ hồ",
        "visualBreakdown": "In- (không) + Determine (xác định) + -ate",
        "ieltsSentence": "The historical treaty left several nautical borders indeterminate, triggering modern maritime skirmishes.",
        "vietnameseTranslation": "Hiệp ước lịch sử đã để lại một số đường biên giới hàng hải không xác định rõ ràng, làm bùng phát các cuộc đụng độ trên biển hiện đại.",
        "level": "C2",
        "collocation": "Indeterminate outcome / Indeterminate duration"
      }
    ]
  },
  {
    "id": "stem-mort-necr",
    "root": "MORT / NECR-",
    "meaning": "Tử vong, sự chết, suy tàn diệt vong",
    "origin": "Latin (mors, mortis - cái chết; Hy Lạp: nekros - thi thể)",
    "description": "Gốc chỉ sự suy tàn, cái chết sinh học, cam kết nợ nần cho đến chết hoặc tỷ lệ tử vong trong y tế công cộng.",
    "tip": "Nhớ đến Mortality (tỷ lệ tử vong) hoặc Mortgage (thế chấp) – giới hạn sinh tử đời người.",
    "category": "Trục 8: Vận Động Của Dòng Đời & Chuyển Dịch",
    "axis": "Trục 8",
    "axisTitle": "TRỤC 8: VẬN ĐỘNG CỦA DÒNG ĐỜI & CHUYỂN DỊCH",
    "axisSubtitle": "Cycle, Progress & Limits (Sinh tử & Suy tàn)",
    "stemKey": "MORT / NECR-",
    "exampleWords": [
      {
        "word": "Mortality",
        "partOfSpeech": "n",
        "meaning": "Tỷ lệ tử vong trong dân số",
        "visualBreakdown": "Mort (chết) + -ality",
        "ieltsSentence": "Improving maternal healthcare facilities drastically reduces infant mortality across developing rural provinces.",
        "vietnameseTranslation": "Cải thiện cơ sở chăm sóc sức khỏe bà mẹ giúp giảm đáng kể tỷ lệ tử vong ở trẻ sơ sinh trên khắp các tỉnh nông thôn đang phát triển.",
        "level": "C1",
        "collocation": "Infant mortality rate / Mortality statistics"
      },
      {
        "word": "Mortgage",
        "partOfSpeech": "n",
        "meaning": "Cam kết thế chấp tài sản vay nợ mua nhà",
        "visualBreakdown": "Mort (chết) + Gage (cam kết) $\\rightarrow$ Cam kết trả nợ cho tới khi xong hoặc chết",
        "ieltsSentence": "Skyrocketing real estate values compel middle-class citizens to shoulder thirty-year mortgage liabilities.",
        "vietnameseTranslation": "Giá trị bất động sản tăng vọt buộc các công dân thuộc tầng lớp trung lưu phải gánh vác các nghĩa vụ thế chấp nhà 30 năm.",
        "level": "C1",
        "collocation": "Mortgage rates / Repay a mortgage"
      },
      {
        "word": "Immortal",
        "partOfSpeech": "adj",
        "meaning": "Bất tử, trường tồn bất diệt",
        "visualBreakdown": "Im- (không) + Mort (chết) + -al",
        "ieltsSentence": "Shakespeare's literary sonnets secured immortal prestige within the global theatrical canon.",
        "vietnameseTranslation": "Những bài thơ sonnet văn học của Shakespeare đã đảm bảo uy tín bất tử trong kho tàng kịch nghệ toàn cầu.",
        "level": "C1",
        "collocation": "Immortal fame / Immortal soul"
      },
      {
        "word": "Morbid",
        "partOfSpeech": "adj",
        "meaning": "Bệnh tật; mang tính bệnh hoạn, u ám",
        "visualBreakdown": "Morbus (bệnh tật, chết chóc) + -id",
        "ieltsSentence": "Tabloid media exploit a morbid fascination with violent criminal sensationalism to boost viewership.",
        "vietnameseTranslation": "Báo lá cải lợi dụng sự tò mò bệnh hoạn đối với những vụ án bạo lực giật gân để tăng lượng người xem.",
        "level": "C2",
        "collocation": "Morbid fascination / Morbid obesity"
      },
      {
        "word": "Mortify",
        "partOfSpeech": "v",
        "meaning": "Làm cho xấu hổ ê chề; kìm hãm dục vọng",
        "visualBreakdown": "Mort (chết) + -ify (làm cho)",
        "ieltsSentence": "The keynote diplomat was visibly mortified upon discovering his presentation contained flawed statistics.",
        "vietnameseTranslation": "Vị nhà ngoại giao diễn thuyết chính đã tỏ rõ sự bẽ bàng ê chề khi phát hiện bài thuyết trình của mình chứa các số liệu sai sót.",
        "level": "C2",
        "collocation": "Utterly mortified / Mortify the flesh"
      },
      {
        "word": "Post-mortem",
        "partOfSpeech": "n",
        "meaning": "Cuộc khám nghiệm tử thi; phân tích nguyên nhân thất bại",
        "visualBreakdown": "Post- (sau) + Mortem (cái chết)",
        "ieltsSentence": "Corporate leadership conducted an exhaustive post-mortem following the catastrophic product launch failure.",
        "vietnameseTranslation": "Ban lãnh đạo tập đoàn đã tiến hành một cuộc họp mổ xẻ phân tích toàn diện sau thất bại thảm hại của đợt ra mắt sản phẩm.",
        "level": "C2",
        "collocation": "Conduct a post-mortem / Post-mortem examination"
      },
      {
        "word": "Necrosis",
        "partOfSpeech": "n",
        "meaning": "Chứng hoại tử tế bào/mô sống",
        "visualBreakdown": "Necr (chết) + -osis (tình trạng bệnh lý)",
        "ieltsSentence": "Severe venomous snakebites can precipitate localized tissue necrosis if antivenom is withheld.",
        "vietnameseTranslation": "Vết rắn độc cắn nghiêm trọng có thể gây hoại tử mô cục bộ nếu không được cấp huyết thanh kháng nọc kịp thời.",
        "level": "C2",
        "collocation": "Tissue necrosis / Avascular necrosis"
      },
      {
        "word": "Necropolis",
        "partOfSpeech": "n",
        "meaning": "Thành phố của người chết, nghĩa địa cổ đại",
        "visualBreakdown": "Necr (chết) + Polis (thành phố)",
        "ieltsSentence": "Archaeologists uncovered pristine dynastic sarcophagi while excavating the ancient Theban necropolis.",
        "vietnameseTranslation": "Các nhà khảo cổ đã phát hiện những chiếc quan tài hoàng gia nguyên vẹn trong khi khai quật nghĩa địa cổ đại Thebes.",
        "level": "C2",
        "collocation": "Ancient necropolis / Vast necropolis"
      }
    ]
  },
  {
    "id": "stem-via-voy",
    "root": "VIA / VOY / WARD-",
    "meaning": "Đường lối, phương hướng di chuyển, hành trình xuyên qua",
    "origin": "Latin (via - con đường; voyager - du hành)",
    "description": "Gốc chỉ con đường khả dĩ để đạt được mục tiêu, sự chệch hướng khỏi kế hoạch hoặc hành trình vượt qua chướng ngại.",
    "tip": "Nhớ đến Voyage (chuyến hải trình) hoặc Viable (khả thi có đường đi) – tìm thấy lối đi giữa muôn trùng khó khăn.",
    "category": "Trục 8: Vận Động Của Dòng Đời & Chuyển Dịch",
    "axis": "Trục 8",
    "axisTitle": "TRỤC 8: VẬN ĐỘNG CỦA DÒNG ĐỜI & CHUYỂN DỊCH",
    "axisSubtitle": "Cycle, Progress & Limits (Đường lối & Chuyển dịch)",
    "stemKey": "VIA / VOY-",
    "exampleWords": [
      {
        "word": "Viable",
        "partOfSpeech": "adj",
        "meaning": "Khả thi, có đường lối để thành công, có thể sống được",
        "visualBreakdown": "Via (con đường) + -able $\\rightarrow$ Có con đường khả dĩ để đi tới đích",
        "ieltsSentence": "Hydrogen fuel cells represent a commercially viable clean alternative to heavy diesel engines.",
        "vietnameseTranslation": "Pin nhiên liệu hydro đại diện cho một giải pháp sạch khả thi về mặt thương mại để thay thế các động cơ diesel hạng nặng.",
        "level": "C1",
        "collocation": "Viable alternative / Economically viable"
      },
      {
        "word": "Deviate",
        "partOfSpeech": "v",
        "meaning": "Chệch hướng khỏi chuẩn mực/kế hoạch ban đầu",
        "visualBreakdown": "De- (lệch) + Via (đường) $\\rightarrow$ Lệch khỏi đường chính",
        "ieltsSentence": "Airliner navigation systems sound automated warnings whenever trajectories deviate from designated flight corridors.",
        "vietnameseTranslation": "Hệ thống định vị của máy bay phát cảnh báo tự động bất cứ khi nào quỹ đạo bị chệch khỏi các hành lang bay được chỉ định.",
        "level": "C1",
        "collocation": "Deviate from norms / Deviate from protocol"
      },
      {
        "word": "Obviate",
        "partOfSpeech": "v",
        "meaning": "Hóa giải, loại bỏ nhu cầu cần thiết",
        "visualBreakdown": "Ob- (chắn trước mặt) + Via (đường) $\\rightarrow$ Đón đường xử lý trước",
        "ieltsSentence": "Widespread preventative digital health screenings obviate the necessity for invasive emergency surgeries.",
        "vietnameseTranslation": "Việc khám sàng lọc sức khỏe số phòng ngừa rộng rãi giúp loại bỏ sự cần thiết của các ca phẫu thuật cấp cứu xâm lấn.",
        "level": "C2",
        "collocation": "Obviate the need / Obviate risk"
      },
      {
        "word": "Impervious",
        "partOfSpeech": "adj",
        "meaning": "Không thấm nước; trơ lì, không bị ảnh hưởng",
        "visualBreakdown": "Im- (không) + Per- (xuyên qua) + Via (đường)",
        "ieltsSentence": "Dogmatic political factions often remain entirely impervious to empirical scientific consensus.",
        "vietnameseTranslation": "Các phe phái chính trị giáo điều thường tỏ ra hoàn toàn trơ lì trước sự đồng thuận khoa học thực nghiệm.",
        "level": "C2",
        "collocation": "Impervious to criticism / Impervious barrier"
      },
      {
        "word": "Voyage",
        "partOfSpeech": "n",
        "meaning": "Chuyến hải trình/thám hiểm không gian dài ngày",
        "visualBreakdown": "Viaticum (hành trình đường dài)",
        "ieltsSentence": "Crewed interplanetary voyages will demand closed-loop life-support systems capable of recycling all waste.",
        "vietnameseTranslation": "Các chuyến hải trình liên hành tinh có người lái sẽ đòi hỏi các hệ thống hỗ trợ sự sống khép kín có khả năng tái chế toàn bộ chất thải.",
        "level": "C1",
        "collocation": "Interplanetary voyage / Maiden voyage"
      },
      {
        "word": "Convey",
        "partOfSpeech": "v",
        "meaning": "Chuyển tải thông điệp; vận chuyển hàng hóa",
        "visualBreakdown": "Con- (cùng) + Via (đường)",
        "ieltsSentence": "Scientific authors must utilize concise terminology to convey complex theoretical propositions lucidly.",
        "vietnameseTranslation": "Các tác giả khoa học phải sử dụng thuật ngữ ngắn gọn để chuyển tải các mệnh đề lý thuyết phức tạp một cách sáng sủa.",
        "level": "C1",
        "collocation": "Convey a message / Convey meaning"
      },
      {
        "word": "Wayward",
        "partOfSpeech": "adj",
        "meaning": "Bướng bỉnh, ương ngạnh, khó bảo",
        "visualBreakdown": "Away + -ward (hướng đi lạc)",
        "ieltsSentence": "Youth rehabilitation initiatives seek to re-integrate wayward adolescents into structured vocational environments.",
        "vietnameseTranslation": "Các sáng kiến phục hồi thanh thiếu niên tìm cách tái hòa nhập những thanh thiếu niên ương ngạnh vào các môi trường học nghề có cấu trúc.",
        "level": "C2",
        "collocation": "Wayward youth / Wayward behavior"
      },
      {
        "word": "Deviation",
        "partOfSpeech": "n",
        "meaning": "Độ lệch chuẩn, sự sai lệch so với chuẩn mực",
        "visualBreakdown": "De- (lệch) + Via (đường) + -ation",
        "ieltsSentence": "Statisticians calculate standard deviation to quantify the dispersion of test scores around the class mean.",
        "vietnameseTranslation": "Các nhà thống kê tính toán độ lệch chuẩn để lượng hóa sự phân tán của điểm thi xung quanh giá trị trung bình của lớp.",
        "level": "C1",
        "collocation": "Standard deviation / Significant deviation"
      }
    ]
  }
];

export const allRoots: WordRoot[] = [
  ...baseRoots,
  ...extraRoots,
  ...trunk10To13Roots,
  ...trunk14To18Roots,
];
export const rootsData: WordRoot[] = allRoots;
export default allRoots;
