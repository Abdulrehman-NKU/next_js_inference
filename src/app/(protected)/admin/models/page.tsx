"use client";

import { IModel } from "@/app/models/Model";
import { TableActions, TableGeneric } from "@/app/components/admin/Table";
import { DialogCustom } from "@/app/components/common/Dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

const TableHeaders = [
  {
    title: "ID",
  },
  {
    title: "Name",
  },
  {
    title: "Description",
  },
  {
    title: "Accept File",
  },
  {
    title: "Inferenece Time (Expected)",
  },
  {
    title: "Actions",
  },
];

const Model_Update_Dialouge_Initial_State = {
  _id: "",
  name: "",
  description: "",
  expectedInferenceTime: "",
  acceptFile: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const page = () => {
  const [models, setModels] = useState<Record<string, any>[]>([]);
  const [showUpdateModelModal, setShowUpdateModelModal] = useState(false);
  const [modelBeingUpdated, setModelBeingUpdate] = useState<IModel>(
    Model_Update_Dialouge_Initial_State
  );

  const fetchModelsData = async () => {
    try {
      const { data } = await axios.get("/api/model");
      setModels(
        data.map((model: IModel) => {
          return {
            id: model._id,
            name: model.name,
            description: model.description,
            acceptFile: model.acceptFile ? "Yes" : "No",
            expectedInferenceTime: model.expectedInferenceTime,
            object_raw_data: model,
          };
        })
      );
    } catch (error) {
      console.log(error, "Error at fetchModelsData");
    }
  };

  const updateModelsData = async () => {
    try {
      await axios.put("/api/model", modelBeingUpdated, {});
      setModels((prev) =>
        prev.map((model) =>
          model.id === modelBeingUpdated._id
            ? {
                id: modelBeingUpdated._id,
                name: modelBeingUpdated.name,
                description: modelBeingUpdated.description,
                acceptFile: modelBeingUpdated.acceptFile ? "Yes" : "No",
                expectedInferenceTime: modelBeingUpdated.expectedInferenceTime,
                object_raw_data: modelBeingUpdated,
              }
            : model
        )
      );
    } catch (error) {
      console.log(error, "Error at updateModelsData");
    }
  };

  useEffect(() => {
    fetchModelsData();
  }, []);

  const actions = [
    {
      title: "Update",
      onClick: (model: IModel) => {
        setShowUpdateModelModal(true);

        setModelBeingUpdate(model);
      },
    },
  ];

  return (
    <>
      <div className="p-5">
        <h1 className="font-semibold text-2xl">Models</h1>
        <TableGeneric
          caption="Models List"
          headers={TableHeaders}
          rows={models.map((r) => ({
            ...r,
            actions: (data: IModel) => (
              <TableActions actions={actions} data={data} />
            ),
          }))}
        />
      </div>
      <DialogCustom
        title={`Update ${modelBeingUpdated.name}`}
        description="Make changes to your model here. Click save when you're done."
        submitBtnTitle="Save changes"
        open={showUpdateModelModal}
        onClose={() => {
          setShowUpdateModelModal(false);
          setModelBeingUpdate(Model_Update_Dialouge_Initial_State);
        }}
        onSubmit={updateModelsData}
      >
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="modelName" className="text-right">
              Name
            </Label>
            <Input
              id="modelName"
              className="col-span-3"
              name="name"
              value={modelBeingUpdated.name}
              onChange={(e) => {
                setModelBeingUpdate((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }));
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="modelDescription" className="text-right">
              Description
            </Label>
            <Textarea
              className="col-span-3"
              id="modelDescription"
              placeholder="Type your description here."
              name="description"
              value={modelBeingUpdated.description}
              onChange={(e) => {
                setModelBeingUpdate((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }));
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="modelInferenceTime" className="text-right">
              Inference Time (s)
            </Label>
            <Input
              className="col-span-3"
              id="modelInferenceTime"
              type="number"
              value={modelBeingUpdated.expectedInferenceTime.slice(0, -1)}
              onChange={(e) => {
                setModelBeingUpdate((prev) => ({
                  ...prev,
                  expectedInferenceTime: e.target.value + "s",
                }));
              }}
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="model_accept_file"
            checked={modelBeingUpdated.acceptFile}
            onCheckedChange={(checked) => {
              setModelBeingUpdate((prev) => ({
                ...prev,
                acceptFile: checked as boolean,
              }));
            }}
          />
          <label
            htmlFor="model_accept_file"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Does model accept file
          </label>
        </div>
      </DialogCustom>
    </>
  );
};

export default page;
