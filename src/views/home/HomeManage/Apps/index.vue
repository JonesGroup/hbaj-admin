<template>
    <div class="main mgT24">
        <el-table :data="tableData">
            <el-table-column label="封面" align="center" width="180">
                <template slot-scope="{ row }">
                    <img :src="row.img" alt="" height="100" />
                </template>
            </el-table-column>
            <el-table-column prop="id" label="序号" width="100" align="center" />
            <el-table-column prop="name" label="应用名称" width="150" align="center" />
            <el-table-column prop="desc" label="应用简介" align="center" />
        </el-table>
    </div>
</template>

<script>
import img1 from "../../HomeManage/images/01.jpg";
import img2 from "../../HomeManage/images/02.jpg";
import img3 from "../../HomeManage/images/03.jpg";
export default {
    data() {
        return {
            tableData: [
                {
                    id: 1,
                    name: "技术解读",
                    desc:
                        "互动式的空间培训课件挑战传统枯燥乏味的平面课件，针对海事安全技术培训目标的理论和现场相结合的技术解读，围绕培训目标构建船舶场景空间，整理上载培训所需的参考内容，标识技术点，图文音像多种形式多维度解读技术点，创建课件引导路径实现对课件内容的讲解顺序梳理，一键自动播放，对标视频培训课件",
                    img: img1
                },
                {
                    id: 2,
                    name: "专业英语",
                    desc: "颠覆性的专业英语学习方法，为使用者构建船舶英语的使用环境，在实船环境中完成专业船舶英语词汇学习和国际公约的原汁原味的例句学习，AI智能发音训练打分，解决",
                    img: img2
                },
                {
                    id: 3,
                    name: "模拟训练",
                    desc:
                        "VR全景船舶空间内模拟突发事件，更加生动的展示船舶系列应急演练；模拟船舶安检情节，安检人员需要在模拟事件中使用英语完成系列的项目检查，通过这种方式提升人员英语表达能力，消除英语工作语言表达障碍",
                    img: img3
                }
            ]
        };
    }
};
</script>
